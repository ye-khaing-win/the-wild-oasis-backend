import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload.module';
import {
  AsyncMicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from './enums';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter, RpcLoggingInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    UploadModule,
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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => new RpcException(errors),
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.useGlobalInterceptors(new RpcLoggingInterceptor(logger));

  await app.listen();
}

bootstrap();
