import { Expose } from 'class-transformer';

export class CabinDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  capacity: number;

  @Expose()
  price: number;

  @Expose()
  discount: number;
}
