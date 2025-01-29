import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RequestLoggerMiddleware } from './logger/logger.middleware';
import { TableModule } from './table/table.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    WinstonModule.forRoot({
      transports: [
        // 1) Логирование в консоль
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp, context }) => {
              return `[${timestamp}] ${level} ${context ? '[' + context + ']' : ''}: ${message}`;
            }),
          ),
          level: 'debug', // Или любой другой уровень
        }),
        // 2) Логирование в файл /logs/app.log (уровень info и выше)
        new winston.transports.File({
          dirname: 'logs',
          filename: 'app.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    TableModule,
    RoleModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
