import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { RpcException } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { S3Service } from '@app/common';
import { UploadFileDto } from '@app/contracts';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3: S3Service,
  ) {}

  async upload(file: UploadFileDto) {
    if (!file.data) {
      throw new RpcException(new NotFoundException('File not found.'));
    }

    const buffer = Buffer.from(file.data, 'base64');
    console.log('here', buffer);
    const fileName = crypto.randomBytes(16).toString('hex');

    console.log(fileName, 'filename');
    let url: string;
    try {
      url = await this.s3.upload(fileName, {
        buffer,
        mimetype: file.type,
      });
    } catch (err) {
      throw new RpcException(new InternalServerErrorException(err.message));
    }

    return this.filesRepository.create({
      name: fileName,
      originalName: file.originalName,
      type: file.type,
      size: file.size,
      url,
    });
  }
}
