import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DatabaseModule, S3Module } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '../enums';
import { FilesRepository } from './files.repository';
import { FileSchema } from './schemas';

@Module({
  imports: [
    DatabaseModule.forFeatureAsync([
      {
        name: File.name,
        useFactory: () => FileSchema,
      },
    ]),
    S3Module.registerAsync({
      useFactory: (config: ConfigService) => ({
        region: config.get<string>(EnvVariable.S3_REGION),
        accessKeyId: config.get<string>(EnvVariable.S3_ACCESS_KEY_ID),
        secretAccessKey: config.get<string>(EnvVariable.S3_SECRET_ACCESS_KEY),
        bucket: config.get<string>(EnvVariable.S3_BUCKET),
        folder: config.get<string>(EnvVariable.S3_BUCKET_FOLDER),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
})
export class FilesModule {}
