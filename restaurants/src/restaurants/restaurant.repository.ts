import { EntityRepository, Repository } from 'typeorm';
import RestaurantCreateDto from './restaurant-create.dto';
import { RestaurantStatus } from './restaurant.model';
import { Restaurant } from './restautant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async createRestaurant(command: RestaurantCreateDto): Promise<Restaurant> {
    const { description, name } = command;
    const restaurant = this.create({
      name,
      description,
      status: RestaurantStatus.CLOSED,
    });

    await this.save(restaurant);
    return restaurant;
  }
}
