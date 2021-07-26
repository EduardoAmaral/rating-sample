import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const mockAuthRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockAuthRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
  });

  describe('sign-up', () => {
    it('should call repository with encrypted password', async () => {
      const spy = jest.spyOn(repository, 'createUser').mockResolvedValueOnce({
        id: 'id',
        email: 'a@a.com',
        password: 'password',
      });
      await service.signUp({ email: 'a@a.com', password: 'password' });

      expect(spy).toBeCalled();

      const arg = spy.mock.calls[0][0];
      expect(arg.email).toBe('a@a.com');
      expect(await bcrypt.compare('password', arg.password)).toBeTruthy();
    });
  });

  describe('sign-in', () => {
    it('should return a token if credentials matches user', async () => {
      const email = 'a@a.com';
      const password = 'password';
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 'id',
        email,
        password: hash,
      });

      const token = await service.signIn({ email, password });

      expect(token).toBeDefined();
    });

    it('should throw invalid credentials if user does not exist', async () => {
      const email = 'a@a.com';
      const password = 'password';

      await expect(() => service.signIn({ email, password })).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should throw invalid credentials if password does not match', async () => {
      const email = 'a@a.com';
      const password = 'password';
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash('another weird password', salt);
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 'id',
        email,
        password: hash,
      });

      await expect(() => service.signIn({ email, password })).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });
});
