import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { tap } from 'rxjs/operators';

@Injectable()
export class RpcLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToRpc();
    const pattern = ctx.getContext().getPattern();
    const data = ctx.getData();

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`Message processed`, {
          pattern,
          data,
          duration: `${duration}ms`,
        });
      }),
    );
  }
}
