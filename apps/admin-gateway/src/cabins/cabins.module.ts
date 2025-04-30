import { Module } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CabinsController } from './cabins.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CABIN_CLIENT, UPLOAD_CLIENT } from '../clients/constatns';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '../enums';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CABIN_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: +config.get<number>(EnvVariable.CABIN_TCP_PORT),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: UPLOAD_CLIENT,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: config.get<number>(EnvVariable.UPLOAD_TCP_PORT),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CabinsController],
  providers: [CabinsService],
})
export class CabinsModule {}
