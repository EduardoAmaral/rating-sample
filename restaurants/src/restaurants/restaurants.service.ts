import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { v4 as uuid } from 'uuid';
import RestaurantDto from './restaurant.dto';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [
    { id: uuid(), name: 'Burger King', description: 'BK' },
    { id: uuid(), name: 'McDonalds', description: 'Mac' },
  ];

  getAll(): Restaurant[] {
    return this.restaurants;
  }

  create(dto: RestaurantDto): Restaurant {
    const restaurant: Restaurant = {
      id: uuid(),
      name: dto.name,
      description: dto.description,
    };

    this.restaurants.push(restaurant);

    return restaurant;
  }
}
