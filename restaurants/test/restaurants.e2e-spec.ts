import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantStatus } from '../src/restaurants/restaurant.status';
import * as request from 'supertest';
import { RestaurantRepository } from '../src/restaurants/restaurant.repository';
import { RestaurantsModule } from '../src/restaurants/restaurants.module';

describe('Restaurants (e2e)', () => {
  let app: INestApplication;
  let repository: RestaurantRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RestaurantsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<RestaurantRepository>(RestaurantRepository);
  });

  it('/api/restaurants (GET)', async () => {
    const restaurant = repository.create({
      name: 'Restaurant 1',
      description: 'Desc 1',
      status: RestaurantStatus.CLOSED,
    });

    await repository.save(restaurant);

    const result = await request(app.getHttpServer()).get('/api/restaurants');
    expect(result.status).toBe(200);
    expect(result.body[0].id).toBeDefined();
    expect(result.body[0].name).toBe('Restaurant 1');
    expect(result.body[0].description).toBe('Desc 1');
    expect(result.body[0].status).toBe(RestaurantStatus.CLOSED);
  });

  it('/api/restaurants/:id (GET)', async () => {
    const restaurant = repository.create({
      name: 'Restaurant 1',
      description: 'Desc 1',
      status: RestaurantStatus.CLOSED,
    });

    await repository.save(restaurant);

    const result = await request(app.getHttpServer()).get(
      `/api/restaurants/${restaurant.id}`,
    );

    expect(result.status).toBe(200);
    expect(result.body.id).toBe(restaurant.id);
    expect(result.body.name).toBe('Restaurant 1');
    expect(result.body.description).toBe('Desc 1');
    expect(result.body.status).toBe(RestaurantStatus.CLOSED);
  });

  it('/api/restaurants (POST)', async () => {
    const name = 'Restaurant';
    const description = 'Description';

    const result = await request(app.getHttpServer())
      .post('/api/restaurants')
      .send({ name, description });

    expect(result.status).toBe(201);
    expect(result.body.id).toBeDefined();
    expect(result.body.name).toBe(name);
    expect(result.body.description).toBe(description);
    expect(result.body.status).toBe(RestaurantStatus.CLOSED);
  });

  it('/api/restaurants/:id (DELETE)', async () => {
    const restaurant = repository.create({
      name: 'Restaurant 1',
      description: 'Desc 1',
      status: RestaurantStatus.CLOSED,
    });

    await repository.save(restaurant);

    const result = await request(app.getHttpServer()).delete(
      `/api/restaurants/${restaurant.id}`,
    );

    expect(result.status).toBe(200);

    expect(await repository.findOne(restaurant.id)).toBeUndefined();
  });

  it('/api/restaurants/:id/status (PATCH)', async () => {
    const restaurant = repository.create({
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.CLOSED,
    });

    await repository.save(restaurant);

    const result = await request(app.getHttpServer())
      .patch(`/api/restaurants/${restaurant.id}/status`)
      .send({ status: RestaurantStatus.OPEN });

    expect(result.status).toBe(200);
    expect(result.body.id).toBe(restaurant.id);
    expect(result.body.name).toBe(restaurant.name);
    expect(result.body.description).toBe(restaurant.description);
    expect(result.body.status).toBe(RestaurantStatus.OPEN);
  });

  afterEach(async () => {
    const restaurants = await repository.find();
    await repository.remove(restaurants);
  });

  afterAll(async () => {
    await app.close();
  });
});
