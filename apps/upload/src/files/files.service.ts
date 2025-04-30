import { NotFoundException, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { RpcException } from '@nestjs/microservices';
import crypto from 'crypto';
import { S3Service } from '@app/common';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3: S3Service,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!file.buffer) {
      throw new RpcException(new NotFoundException('File not found.'));
    }

    const fileName = crypto.randomBytes(16).toString('hex');

    const url = await this.s3.upload(fileName, file);

    return this.filesRepository.create({
      name: fileName,
      originalName: file.originalname,
      type: file.mimetype,
      size: file.size,
      url,
    });
  }
}
