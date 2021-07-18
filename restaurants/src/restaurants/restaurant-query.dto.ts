import { RestaurantStatus } from './restaurant.model';

export class RestaurantQueryDto {
  search?: string;
  status?: RestaurantStatus;
}
