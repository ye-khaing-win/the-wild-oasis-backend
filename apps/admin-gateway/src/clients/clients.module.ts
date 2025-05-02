import { Global, Module } from '@nestjs/common';
import {
  ClientsModule as NestClientsModule,
  Transport,
} from '@nestjs/microservices';
import { CABIN_CLIENT } from './constatns';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '../enums';

@Global()
@Module({
  imports: [
    NestClientsModule.registerAsync([
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
    ]),
  ],
})
export class ClientsModule {}
