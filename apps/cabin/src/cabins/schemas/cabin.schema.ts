import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'cabins',
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cabin extends AbstractDocument {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  capacity: number;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop({
    required: true,
  })
  imageUrl: string;
}

export type CabinDocument = HydratedDocument<Cabin>;
export const CabinSchema = SchemaFactory.createForClass(Cabin);
