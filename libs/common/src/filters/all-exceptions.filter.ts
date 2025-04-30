import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

@Catch(RpcException)
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  constructor(private readonly logger: Logger) {
    super();
  }

  catch(exception: RpcException, host: ArgumentsHost) {
    this.logger.error(exception);
    return super.catch(exception, host);
  }
}
