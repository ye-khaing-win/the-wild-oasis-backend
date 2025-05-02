import { IsBase64, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsBase64()
  data: string;
}
