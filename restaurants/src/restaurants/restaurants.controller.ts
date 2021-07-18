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
import { Restaurant, RestaurantStatus } from './restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getAll(@Query() queryDto: RestaurantQueryDto): Restaurant[] {
    return this.restaurantsService.getAllBy(queryDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Restaurant {
    return this.restaurantsService.getById(id);
  }

  @Post()
  create(@Body() dto: RestaurantCreateDto): Restaurant {
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
