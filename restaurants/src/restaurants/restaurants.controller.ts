import { Controller, Get } from '@nestjs/common';
import { Restaurant } from './restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(): Restaurant[] {
    return this.restaurantsService.getAll();
  }
}
