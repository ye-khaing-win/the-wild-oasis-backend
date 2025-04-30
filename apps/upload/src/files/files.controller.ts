import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FILES_PATTERNS } from '@app/contracts';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({ cmd: FILES_PATTERNS.UPLOAD })
  upload(@Payload() file: Express.Multer.File) {
    return this.filesService.upload(file);
  }
}
