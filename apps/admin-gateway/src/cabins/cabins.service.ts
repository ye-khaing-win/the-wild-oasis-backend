import { Inject, Injectable } from '@nestjs/common';
import { CABIN_CLIENT } from '../clients/constatns';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCabinDto } from './dto';
import {
  CreateCabinDto as ClientCreateCabinDto,
  CabinDto as ClientCabinDto,
} from '@app/contracts';
import { CABINS_PATTERNS } from '@app/contracts';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CabinsService {
  constructor(
    @Inject(CABIN_CLIENT) private readonly cabinClient: ClientProxy,
  ) {}

  async create(dto: CreateCabinDto) {
    const pattern = { cmd: CABINS_PATTERNS.CREATE };
    const payload = { ...dto, imageId: '68025f90e36ac65886d74a33' };
    return await firstValueFrom(
      this.cabinClient.send<ClientCabinDto, ClientCreateCabinDto>(
        pattern,
        payload,
      ),
    );
  }
}
