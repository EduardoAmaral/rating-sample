import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

const mockAuthService = () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
});

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('sign-up', () => {
    it('should interact with service', () => {
      controller.signUp({ email: 'a@a.com', password: '12345678' });
      expect(service.signUp).toBeCalledWith({
        email: 'a@a.com',
        password: '12345678',
      });
    });
  });

  describe('sign-in', () => {
    it('should interact with service signIn method', () => {
      controller.signIn({ email: 'a@a.com', password: '12345678' });
      expect(service.signIn).toBeCalledWith({
        email: 'a@a.com',
        password: '12345678',
      });
    });
  });
});
