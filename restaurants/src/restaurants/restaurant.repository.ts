import { EntityRepository, Repository } from 'typeorm';
import RestaurantCreateDto from './restaurant-create.dto';
import { RestaurantQueryDto } from './restaurant-query.dto';
import { RestaurantStatus } from './restaurant.status';
import { Restaurant } from './restautant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async search(filter: RestaurantQueryDto): Promise<Restaurant[]> {
    const query = this.createQueryBuilder('restaurant');

    if (filter.status) {
      query.andWhere('restaurant.status = :status', { status: filter.status });
    }

    if (filter.search) {
      query.andWhere(
        'LOWER(restaurant.name) LIKE LOWER(:search) OR LOWER(restaurant.description) LIKE LOWER(:search)',
        { search: `%${filter.search}%` },
      );
    }

    return query.getMany();
  }

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
