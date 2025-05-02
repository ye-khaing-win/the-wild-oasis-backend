import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
