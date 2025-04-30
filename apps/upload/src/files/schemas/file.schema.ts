import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'files',
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class File extends AbstractDocument {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  originalName: string;

  @Prop({
    required: true,
  })
  type: string;

  @Prop({
    required: true,
  })
  size: number;

  @Prop({
    required: true,
  })
  url: string;
}

export type FileDocument = HydratedDocument<File>;
export const FileSchema = SchemaFactory.createForClass(File);
