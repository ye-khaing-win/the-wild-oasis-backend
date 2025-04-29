import { Controller } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CABINS_PATTERNS, CreateCabinDto } from '@app/contracts';
import { Payload, MessagePattern } from '@nestjs/microservices';

@Controller()
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  @MessagePattern({ cmd: CABINS_PATTERNS.CREATE })
  create(@Payload() dto: CreateCabinDto) {
    return this.cabinsService.create(dto);
  }
}
