import { AbstractRepository } from '@app/common';
import { Cabin } from './schemas/cabin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CabinsRepository extends AbstractRepository<Cabin> {
  constructor(
    @InjectModel(Cabin.name) private readonly cabinModel: Model<Cabin>,
  ) {
    super(cabinModel);
  }
}
