import { Expose } from 'class-transformer';

export class FileDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  originalName: string;

  @Expose()
  type: string;

  @Expose()
  size: number;

  @Expose()
  url: string;
}
