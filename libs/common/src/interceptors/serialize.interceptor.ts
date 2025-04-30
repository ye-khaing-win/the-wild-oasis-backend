import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Constructable } from '../interfaces';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: Constructable) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const result = response instanceof Array ? response.length : undefined;

        const data =
          response &&
          (plainToInstance(this.dto, response, {
            excludeExtraneousValues: true,
          }) as any);

        return {
          result,
          success: true,
          data,
        };
      }),
    );
  }
}
