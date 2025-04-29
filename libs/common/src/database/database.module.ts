import { Module } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule,
  AsyncModelFactory,
} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { Logger } from 'nestjs-pino';
import { EnvVariable, InfoMessage } from '../enums';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: (config: ConfigService, logger: Logger) => ({
        uri: config.get<string>(EnvVariable.MONGODB_URI),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () =>
            logger.log(InfoMessage.DB_CONNECTION_SUCCESS),
          );

          return connection;
        },
      }),
      inject: [ConfigService, Logger],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }

  static forFeatureAsync(factories: AsyncModelFactory[]) {
    return MongooseModule.forFeatureAsync(factories);
  }
}
