import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { CabinsModule } from './cabins/cabins.module';
import { EnvVariable } from './enums';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/cabin/.env',
      validationSchema: Joi.object({
        [EnvVariable.NODE_ENV]: Joi.string().required(),
        [EnvVariable.MONGODB_URI]: Joi.string().required(),
        [EnvVariable.UPLOAD_TCP_PORT]: Joi.number().default(9009),
      }),
    }),
    DatabaseModule,
    CabinsModule,
  ],
  controllers: [],
  providers: [],
})
export class CabinModule {}
