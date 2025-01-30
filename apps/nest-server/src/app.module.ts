import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RequestLoggerMiddleware } from './logger/logger.middleware';
import { TableModule } from './table/table.module';
import { SpaceModule } from './sapce/sapce.module';
import { BaseModule } from './base/base.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
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
    UserModule,
    TableModule,
    SpaceModule,
    BaseModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
