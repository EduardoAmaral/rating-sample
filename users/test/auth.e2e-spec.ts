import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UserRepository } from '../src/auth/user.repository';

describe('AuthController - e2e', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    process.env = { ...process.env, JWT_SECRET: 'fake-secret' };

    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('/api/users/signup (POST)', async () => {
    const email = 'email@provider.com';
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        email,
        password: '12345678',
      });

    expect(response.status).toBe(201);
    expect(userRepository.findOne({ email })).toBeDefined();
  });

  it('/api/users/signup (POST) - should return 400 when email is not valid', async () => {
    const invalidEmail = 'provider.com';
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        email: invalidEmail,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('email must be an email');
    expect(userRepository.findOne({ email: invalidEmail })).toMatchObject({});
  });

  it('/api/users/signup (POST) - should return 400 when password is not provided', async () => {
    const email = 'email@provider.com';
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        email,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      'password must be longer than or equal to 8 characters',
    );
    expect(userRepository.findOne({ email })).toMatchObject({});
  });

  it('/api/users/signup (POST) - should return 400 when password is longer than expected', async () => {
    const email = 'email@provider.com';
    const response = await request(app.getHttpServer())
      .post('/api/users/signup')
      .send({
        email,
        password: '1234567890123456789012345678901234567890',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      'password must be shorter than or equal to 32 characters',
    );
    expect(userRepository.findOne({ email })).toMatchObject({});
  });

  afterEach(async () => {
    const users = await userRepository.find();
    await userRepository.remove(users);
  });

  afterAll(async () => {
    await app.close();
  });
});
