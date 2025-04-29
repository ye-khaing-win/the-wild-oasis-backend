import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCabinDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;
}
