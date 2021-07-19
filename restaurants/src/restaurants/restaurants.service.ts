import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantStatus } from './restaurant.status';
import RestaurantCreateDto from './restaurant-create.dto';
import { RestaurantQueryDto } from './restaurant-query.dto';
import { RestaurantRepository } from './restaurant.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restautant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private respository: RestaurantRepository,
  ) {}

  searchBy(query: RestaurantQueryDto): Promise<Restaurant[]> {
    return this.respository.search(query);
  }

  async getById(id: string): Promise<Restaurant> {
    const restaurant = await this.respository.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }

    return restaurant;
  }

  create(command: RestaurantCreateDto): Promise<Restaurant> {
    return this.respository.createRestaurant(command);
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.respository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }
  }

  async updateStatus(
    id: string,
    status: RestaurantStatus,
  ): Promise<Restaurant> {
    const restaurant = await this.getById(id);

    restaurant.status = status;

    this.respository.save(restaurant);

    return restaurant;
  }
}
