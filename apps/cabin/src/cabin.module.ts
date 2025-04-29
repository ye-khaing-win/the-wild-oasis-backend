import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, EnvVariable } from '@app/common';
import { CabinsModule } from './cabins/cabins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/cabin/.env',
      validationSchema: Joi.object({
        [EnvVariable.NODE_ENV]: Joi.string().required(),
        [EnvVariable.MONGODB_URI]: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    CabinsModule,
  ],
  controllers: [],
  providers: [],
})
export class CabinModule {}
