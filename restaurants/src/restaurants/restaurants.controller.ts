import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import RestaurantCreateDto from './restaurant-create.dto';
import { RestaurantQueryDto } from './restaurant-query.dto';
import { RestaurantStatus } from './restaurant.status';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restautant.entity';

@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(@Query() queryDto: RestaurantQueryDto): Promise<Restaurant[]> {
    return this.restaurantsService.searchBy(queryDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.getById(id);
  }

  @Post()
  create(@Body() dto: RestaurantCreateDto): Promise<Restaurant> {
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
  ): Promise<Restaurant> {
    return this.restaurantsService.updateStatus(id, status);
  }
}
