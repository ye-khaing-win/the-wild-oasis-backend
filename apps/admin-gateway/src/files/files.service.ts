import { Inject, Injectable } from '@nestjs/common';
import { UPLOAD_CLIENT } from '../clients/constatns';
import { ClientProxy } from '@nestjs/microservices';
import { FileDto, FILES_PATTERNS, UploadFileDto } from '@app/contracts';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FilesService {
  constructor(
    @Inject(UPLOAD_CLIENT) private readonly uploadClient: ClientProxy,
  ) {}

  async upload(file: Express.Multer.File) {
    const pattern = { cmd: FILES_PATTERNS.UPLOAD };
    const payload = {
      originalName: file.originalname,
      type: file.mimetype,
      size: file.size,
      data: file.buffer.toString('base64'),
    };
    console.log(pattern, payload);

    return firstValueFrom(
      this.uploadClient.send<FileDto, UploadFileDto>(pattern, payload),
    );
  }
}
