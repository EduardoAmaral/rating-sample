import { Test, TestingModule } from '@nestjs/testing';
import { Restaurant } from '../model/restautant.entity';
import { RestaurantStatus } from '../restaurant.status';
import { RestaurantsController } from '../restaurants.controller';
import { RestaurantsService } from '../restaurants.service';

const mockRestaurantsService = () => ({
  create: jest.fn(),
  searchBy: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  updateStatus: jest.fn(),
});

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        { provide: RestaurantsService, useFactory: mockRestaurantsService },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should create a restaurant', async () => {
    const name = 'Restaurant';
    const description = 'Some description';
    jest.spyOn(service, 'create').mockResolvedValueOnce({
      id: 'uuid',
      name,
      description,
      status: RestaurantStatus.CLOSED,
      created: new Date(),
      updated: new Date(),
    });

    const result: Restaurant = await controller.create({
      name,
      description,
    });

    expect(service.create).toHaveBeenCalledWith({ name, description });

    expect(result.id).toBe('uuid');
    expect(result.name).toBe(name);
    expect(result.description).toBe(description);
    expect(result.status).toBe(RestaurantStatus.CLOSED);
  });

  it('should get all restaurants', async () => {
    const now = new Date();
    jest.spyOn(service, 'searchBy').mockResolvedValueOnce([
      {
        id: 'uuid 1',
        name: 'Restaurant 1',
        description: 'Desc 1',
        status: RestaurantStatus.OPEN,
        created: now,
        updated: now,
      },
      {
        id: 'uuid 2',
        name: 'Restaurant 2',
        description: 'Desc 2',
        status: RestaurantStatus.CLOSED,
        created: now,
        updated: now,
      },
    ]);

    const result = await controller.getAll({ search: 'Rest' });

    expect(service.searchBy).toHaveBeenLastCalledWith({ search: 'Rest' });

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      id: 'uuid 1',
      name: 'Restaurant 1',
      description: 'Desc 1',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });
    expect(result).toContainEqual({
      id: 'uuid 2',
      name: 'Restaurant 2',
      description: 'Desc 2',
      status: RestaurantStatus.CLOSED,
      created: now,
      updated: now,
    });
  });

  it('should get a restaurant by id', async () => {
    const now = new Date();
    jest.spyOn(service, 'getById').mockResolvedValueOnce({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });

    const result = await controller.getById('uuid');

    expect(service.getById).toHaveBeenLastCalledWith('uuid');

    expect(result).toMatchObject({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });
  });

  it('should delete a restaurant', async () => {
    jest.spyOn(service, 'deleteById');

    await controller.delete('uuid');

    expect(service.deleteById).toHaveBeenLastCalledWith('uuid');
  });

  it("should update a restaurant's status", async () => {
    const now = new Date();
    jest.spyOn(service, 'updateStatus').mockResolvedValueOnce({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });

    const result = await controller.updateStatus('uuid', RestaurantStatus.OPEN);

    expect(service.updateStatus).toHaveBeenLastCalledWith(
      'uuid',
      RestaurantStatus.OPEN,
    );

    expect(result).toMatchObject({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });
  });
});
