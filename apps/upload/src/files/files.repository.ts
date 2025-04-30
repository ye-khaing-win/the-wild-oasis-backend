import { AbstractRepository } from '@app/common';
import { File } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepository extends AbstractRepository<File> {
  constructor(
    @InjectModel(File.name) protected readonly fileModel: Model<File>,
  ) {
    super(fileModel);
  }
}
