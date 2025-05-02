import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './s3.module-definition';
import { S3ModuleOptions } from './interfaces';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service implements OnModuleInit {
  private s3Client: S3Client;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: S3ModuleOptions) {}

  onModuleInit() {
    const { region, accessKeyId, secretAccessKey } = this.options;

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(
    fileName: string,
    file: { buffer: Buffer<ArrayBufferLike>; mimetype: string },
  ): Promise<string> {
    const { bucket, folder, region } = this.options;
    const { buffer, mimetype } = file;

    try {
      const Key = `${folder}/${fileName}`;
      const url = `https://${bucket}.s3.${region}.amazonaws.com/${Key}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);

      return url;
    } catch (error) {
      throw error;
    }
  }
}
