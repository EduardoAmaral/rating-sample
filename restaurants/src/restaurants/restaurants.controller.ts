import { Body, Controller, Get, Post } from '@nestjs/common';
import RestaurantDto from './restaurant.dto';
import { Restaurant } from './restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(): Restaurant[] {
    return this.restaurantsService.getAll();
  }

  @Post()
  create(@Body() dto: RestaurantDto): Restaurant {
    return this.restaurantsService.create(dto);
  }
}
