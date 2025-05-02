import { Module } from '@nestjs/common';
import { CabinsModule } from './cabins/cabins.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvVariable } from './enums';
import { LoggerModule } from '@app/common';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/admin-gateway/.env',
      validationSchema: Joi.object({
        [EnvVariable.NODE_ENV]: Joi.string().default('development'),
        [EnvVariable.HTTP_PORT]: Joi.number().default(4000),
        [EnvVariable.CABIN_TCP_PORT]: Joi.number().required(),
        [EnvVariable.UPLOAD_TCP_PORT]: Joi.number().required(),
      }),
    }),
    LoggerModule,
    CabinsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminGatewayModule {}
