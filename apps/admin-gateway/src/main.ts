import { NestFactory } from '@nestjs/core';
import { AdminGatewayModule } from './admin-gateway.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { EnvVariable } from './enums';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter, RpcExceptionInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminGatewayModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);

  const PORT = config.get<number>(EnvVariable.HTTP_PORT) || 4001;
  const NODE_ENV = config.get<string>(EnvVariable.NODE_ENV);

  // MIDDLEWARES
  app.useLogger(logger);
  app.use(cookieParser());
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validation Pipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // );

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalInterceptors(new RpcExceptionInterceptor());

  await app.listen(PORT, () => {
    logger.log(
      `CLIENT ${NODE_ENV.toUpperCase()} SERVER RUNNING ON PORT: ${PORT}`,
    );
  });
}
bootstrap();
