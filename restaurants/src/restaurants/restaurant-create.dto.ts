import { IsNotEmpty } from 'class-validator';

export default class RestaurantCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
