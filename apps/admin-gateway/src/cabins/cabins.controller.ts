import { Body, Controller, Post } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CreateCabinDto } from './dto';

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  @Post()
  create(@Body() dto: CreateCabinDto) {
    return this.cabinsService.create(dto);
  }
}
