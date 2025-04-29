import { Module } from '@nestjs/common';
import { CabinsService } from './cabins.service';
import { CabinsController } from './cabins.controller';
import { CabinsRepository } from './cabins.repository';
import { DatabaseModule } from '@app/common';
import { Cabin, CabinSchema } from './schemas/cabin.schema';

@Module({
  imports: [
    DatabaseModule.forFeatureAsync([
      {
        name: Cabin.name,
        useFactory: () => CabinSchema,
      },
    ]),
  ],
  controllers: [CabinsController],
  providers: [CabinsService, CabinsRepository],
})
export class CabinsModule {}
