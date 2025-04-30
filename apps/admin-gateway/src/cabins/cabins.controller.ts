import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CreateCabinDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateCabinDto,
    // @UploadedFile(
    //   new ParseFilePipeBuilder()
    //     .addFileTypeValidator({ fileType: /^image\/(png|jpeg|jpg)$/ })
    //     .addMaxSizeValidator({
    //       maxSize: 25000000, // 25MB
    //     })
    //     .build({
    //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    //     }),
    // )
    // file: Express.Multer.File,
  ) {
    return this.cabinsService.create(dto);
  }
}
