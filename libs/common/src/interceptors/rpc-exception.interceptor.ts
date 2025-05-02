import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError((error) => {
        if (!(error instanceof Error)) {
          const message =
            typeof error.message === 'string'
              ? error
              : (error?.message ?? 'Unknown error.');

          const status =
            typeof error == 'object' && typeof error.status === 'number'
              ? error.status
              : HttpStatus.INTERNAL_SERVER_ERROR;

          return throwError(() => new HttpException(message, status));
        }

        return throwError(() => error);
      }),
    );
  }
}
