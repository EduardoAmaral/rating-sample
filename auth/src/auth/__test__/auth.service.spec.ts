import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';

const mockAuthRepository = () => ({
  createUser: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockAuthRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
  });

  describe('sign-up', () => {
    it('should call repository with encrypted password', async () => {
      const spy = jest.spyOn(repository, 'createUser');
      await service.signUp({ email: 'a@a.com', password: 'password' });

      expect(spy).toBeCalled();

      const arg = spy.mock.calls[0][0];
      expect(arg.email).toBe('a@a.com');
      expect(await bcrypt.compare('password', arg.password)).toBeTruthy();
    });
  });
});
