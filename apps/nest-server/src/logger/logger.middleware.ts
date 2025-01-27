import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP'); // или любой другой контекст

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // В момент завершения ответа получаем статус
    res.on('finish', () => {
      const { statusCode } = res;
      // Любой формат лога
      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`);
    });

    next();
  }
}
