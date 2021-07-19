import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantStatus } from './restaurant.model';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: RestaurantStatus;
}
