import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileDto, FILES_PATTERNS, UploadFileDto } from '@app/contracts';
import { Serialize } from '@app/common/decorators';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Serialize(FileDto)
  @MessagePattern({ cmd: FILES_PATTERNS.UPLOAD })
  upload(@Payload() file: UploadFileDto) {
    return this.filesService.upload(file);
  }
}
