import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvVariable } from './enums';
import { DatabaseModule, LoggerModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/upload/.env',
      validationSchema: Joi.object({
        [EnvVariable.NODE_ENV]: Joi.string().default('development'),
        [EnvVariable.MONGODB_URI]: Joi.string().required(),
        [EnvVariable.TCP_PORT]: Joi.number().default(9001),
        [EnvVariable.S3_REGION]: Joi.string().required(),
        [EnvVariable.S3_ACCESS_KEY_ID]: Joi.string().required(),
        [EnvVariable.S3_SECRET_ACCESS_KEY]: Joi.string().required(),
        [EnvVariable.S3_BUCKET]: Joi.string().required(),
        [EnvVariable.S3_BUCKET_FOLDER]: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    LoggerModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class UploadModule {}
