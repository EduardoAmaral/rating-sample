import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../src/auth/user.repository';

describe('AuthController - e2e', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          logging: true,
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('sign-up', async () => {
    const email = 'email@provider.com';
    const response = await request(app.getHttpServer())
      .post('/api/auth/signup')
      .send({
        email,
        password: '12345678',
      });

    expect(response.status).toBe(201);
    expect(userRepository.findOne({ email })).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
