import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantModel, RestaurantStatus } from './restaurant.model';
import { v4 as uuid } from 'uuid';
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

  private restaurants: RestaurantModel[] = [
    {
      id: uuid(),
      name: 'Burger King',
      description: 'BK',
      status: RestaurantStatus.OPEN,
    },
    {
      id: uuid(),
      name: 'McDonalds',
      description: 'Mac',
      status: RestaurantStatus.OPEN,
    },
  ];

  getAllBy(query: RestaurantQueryDto): RestaurantModel[] {
    let result = this.restaurants;
    if (query.search) {
      result = result.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    if (query.status) {
      result = result.filter(
        (restaurant) => restaurant.status === query.status,
      );
    }
    return result;
  }

  getById(id: string): RestaurantModel {
    const restaurant = this.restaurants.find(
      (restaurant) => restaurant.id == id,
    );

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }

    return restaurant;
  }

  create(command: RestaurantCreateDto): Promise<Restaurant> {
    return this.respository.createRestaurant(command);
  }

  deleteById(id: string): void {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id != id,
    );
  }

  updateStatus(id: string, status: RestaurantStatus): RestaurantModel {
    const restaurant = this.getById(id);

    restaurant.status = status;

    return restaurant;
  }
}
