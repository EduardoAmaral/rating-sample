import { Test, TestingModule } from '@nestjs/testing';
import { Restaurant } from '../model/restautant.entity';
import { RestaurantRepository } from '../restaurant.repository';
import { RestaurantStatus } from '../restaurant.status';
import { RestaurantsService } from '../restaurants.service';

const mockRestaurantsRepository = () => ({
  createRestaurant: jest.fn(),
  findOne: jest.fn(),
  search: jest.fn(),
  softDelete: jest.fn(),
  save: jest.fn(),
});

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: RestaurantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RestaurantRepository,
          useFactory: mockRestaurantsRepository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  it('should create a restaurant', async () => {
    const name = 'Restaurant';
    const description = 'Some description';
    jest.spyOn(repository, 'createRestaurant').mockResolvedValueOnce({
      id: 'uuid',
      name,
      description,
      status: RestaurantStatus.CLOSED,
      created: new Date(),
      updated: new Date(),
    });

    const result: Restaurant = await service.create({
      name,
      description,
    });

    expect(repository.createRestaurant).toHaveBeenCalledWith({
      name,
      description,
    });

    expect(result.id).toBe('uuid');
    expect(result.name).toBe(name);
    expect(result.description).toBe(description);
    expect(result.status).toBe(RestaurantStatus.CLOSED);
  });

  it('should get all restaurants', async () => {
    const now = new Date();
    jest.spyOn(repository, 'search').mockResolvedValueOnce([
      {
        id: 'uuid 1',
        name: 'Restaurant 1',
        description: 'Desc 1',
        status: RestaurantStatus.CLOSED,
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

    const result = await service.searchBy({ status: RestaurantStatus.CLOSED });

    expect(repository.search).toHaveBeenLastCalledWith({
      status: RestaurantStatus.CLOSED,
    });

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      id: 'uuid 1',
      name: 'Restaurant 1',
      description: 'Desc 1',
      status: RestaurantStatus.CLOSED,
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
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });

    const result = await service.getById('uuid');

    expect(repository.findOne).toHaveBeenLastCalledWith('uuid');

    expect(result).toMatchObject({
      id: 'uuid',
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    });
  });

  it('should throw NotFoundException when restaurant does not exist', async () => {
    const id = 'uuid';

    await expect(service.getById(id)).rejects.toThrow(
      `Restaurant ${id} not found`,
    );
  });

  it('should delete a restaurant', async () => {
    jest
      .spyOn(repository, 'softDelete')
      .mockResolvedValueOnce({ affected: 1, raw: {}, generatedMaps: [] });

    await service.deleteById('uuid');

    expect(repository.softDelete).toHaveBeenLastCalledWith('uuid');
  });

  it('should throw NotFoundException when deleted restaurant does not exist', async () => {
    const id = 'uuid';
    jest
      .spyOn(repository, 'softDelete')
      .mockResolvedValueOnce({ affected: 0, raw: {}, generatedMaps: [] });

    await expect(service.deleteById(id)).rejects.toThrow(
      `Restaurant ${id} not found`,
    );
  });

  it('should update restaurant status', async () => {
    const id = 'uuid';
    const now = new Date();
    const previousData = {
      id,
      name: 'Restaurant',
      description: 'Description',
      status: RestaurantStatus.OPEN,
      created: now,
      updated: now,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(previousData);

    const result = await service.updateStatus(id, RestaurantStatus.CLOSED);

    expect(repository.save).toHaveBeenLastCalledWith({
      ...previousData,
      status: RestaurantStatus.CLOSED,
    });

    expect(result.status).toBe(RestaurantStatus.CLOSED);
  });

  it('should throw NotFoundException when updated restaurant does not exist', async () => {
    const id = 'uuid';

    await expect(
      service.updateStatus(id, RestaurantStatus.CLOSED),
    ).rejects.toThrow(`Restaurant ${id} not found`);
  });
});
