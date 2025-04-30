import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor, Constructable } from '@app/common';

export function Serialize(dto: Constructable = class {}) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
