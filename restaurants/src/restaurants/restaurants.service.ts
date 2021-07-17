import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.model';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [
    { name: 'A', description: 'Description A' },
    { name: 'B', description: 'Desc B' },
  ];

  getAll(): Restaurant[] {
    return this.restaurants;
  }
}
