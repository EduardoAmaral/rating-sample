import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import RestaurantDto from './restaurant.dto';
import { Restaurant, RestaurantStatus } from './restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(): Restaurant[] {
    return this.restaurantsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Restaurant {
    return this.restaurantsService.getById(id);
  }

  @Post()
  create(@Body() dto: RestaurantDto): Restaurant {
    return this.restaurantsService.create(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.restaurantsService.deleteById(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: RestaurantStatus,
  ): Restaurant {
    return this.restaurantsService.updateStatus(id, status);
  }
}
