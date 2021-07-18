import { Injectable } from '@nestjs/common';
import { Restaurant, RestaurantStatus } from './restaurant.model';
import { v4 as uuid } from 'uuid';
import RestaurantCreateDto from './restaurant-create.dto';
import { RestaurantQueryDto } from './restaurant-query.dto';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [
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

  getAllBy(query: RestaurantQueryDto): Restaurant[] {
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

  getById(id: string): Restaurant {
    return this.restaurants.find((restaurant) => restaurant.id == id);
  }

  create(dto: RestaurantCreateDto): Restaurant {
    const restaurant: Restaurant = {
      id: uuid(),
      name: dto.name,
      description: dto.description,
      status: RestaurantStatus.CLOSED,
    };

    this.restaurants.push(restaurant);

    return restaurant;
  }

  deleteById(id: string): void {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id != id,
    );
  }

  updateStatus(id: string, status: RestaurantStatus): Restaurant {
    let updatedRestaurant;
    this.restaurants = this.restaurants.map((restaurant) => {
      if (restaurant.id == id) {
        restaurant.status = status;
        updatedRestaurant = restaurant;
      }
      return restaurant;
    });

    return updatedRestaurant;
  }
}
