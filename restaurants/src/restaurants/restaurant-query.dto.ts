import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RestaurantStatus } from './restaurant.model';

export class RestaurantQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(RestaurantStatus)
  status?: RestaurantStatus;
}
