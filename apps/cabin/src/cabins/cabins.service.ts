import { Injectable } from '@nestjs/common';
import { CabinsRepository } from './cabins.repository';
import { CreateCabinDto } from '@app/contracts';

@Injectable()
export class CabinsService {
  constructor(private readonly cabinsRepository: CabinsRepository) {}

  async create(dto: CreateCabinDto) {
    return this.cabinsRepository.create(dto);
  }
}
