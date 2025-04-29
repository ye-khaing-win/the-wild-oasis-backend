import { Prop } from '@nestjs/mongoose';

export abstract class AbstractDocument {
  @Prop()
  deletedAt?: Date;
}
