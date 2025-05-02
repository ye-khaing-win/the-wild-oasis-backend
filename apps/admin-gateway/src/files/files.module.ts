import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UPLOAD_CLIENT } from '../clients/constatns';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '../enums';

@Module({
  imports: [
    ClientsModule.registerAsync([
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
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
