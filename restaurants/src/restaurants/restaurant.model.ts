export interface Restaurant {
  id?: string;
  name: string;
  description: string;
  status: RestaurantStatus;
}

export enum RestaurantStatus {
  OPEN,
  CLOSED,
}
