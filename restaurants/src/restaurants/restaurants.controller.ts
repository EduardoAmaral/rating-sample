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
import { RestaurantModel, RestaurantStatus } from './restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restautant.entity';

@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(@Query() queryDto: RestaurantQueryDto): RestaurantModel[] {
    return this.restaurantsService.getAllBy(queryDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): RestaurantModel {
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
  ): RestaurantModel {
    return this.restaurantsService.updateStatus(id, status);
  }
}
