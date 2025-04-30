import { ConflictException, Injectable } from '@nestjs/common';
import { CabinsRepository } from './cabins.repository';
import { CreateCabinDto } from '@app/contracts';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CabinsService {
  constructor(private readonly cabinsRepository: CabinsRepository) {}

  async create(dto: CreateCabinDto) {
    const cabin = await this.cabinsRepository.exists({ name: dto.name });
    if (cabin) {
      throw new RpcException(new ConflictException('Cabin already exists.'));
    }

    return this.cabinsRepository.create(dto);
  }
}
