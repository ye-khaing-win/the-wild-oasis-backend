import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCabinDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  discount: number;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
