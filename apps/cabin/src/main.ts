import { NestFactory } from '@nestjs/core';
import { CabinModule } from './cabin.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@app/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    CabinModule,
    {
      useFactory: (config: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          port: config.get<number>(EnvVariable.TCP_PORT),
        },
      }),
      inject: [ConfigService],
    },
  );

  const logger = app.get(Logger);
  app.useLogger(logger);
  // MIDDLEWARES
  await app.listen();
}

bootstrap();
