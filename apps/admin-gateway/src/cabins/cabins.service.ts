import { Inject, Injectable } from '@nestjs/common';
import { CABIN_CLIENT, UPLOAD_CLIENT } from '../clients/constatns';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCabinDto } from './dto';
import {
  CreateCabinDto as ClientCreateCabinDto,
  CabinDto as ClientCabinDto,
  FileDto as ClientFileDto,
} from '@app/contracts';
import { CABINS_PATTERNS } from '@app/contracts';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CabinsService {
  constructor(
    @Inject(CABIN_CLIENT) private readonly cabinClient: ClientProxy,
    @Inject(UPLOAD_CLIENT) private readonly uploadClient: ClientProxy,
  ) {}

  async create(dto: CreateCabinDto) {
    // console.log(file);
    // const image = await firstValueFrom(
    //   this.uploadClient.send<ClientFileDto, Express.Multer.File>({}, file),
    // );

    const pattern = { cmd: CABINS_PATTERNS.CREATE };
    const payload = { ...dto, imageId: '123123S' };

    return await firstValueFrom(
      this.cabinClient.send<ClientCabinDto, ClientCreateCabinDto>(
        pattern,
        payload,
      ),
    );
  }
}
