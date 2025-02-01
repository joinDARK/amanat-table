import * as winston from 'winston';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { RequestLoggerMiddleware } from './logger/logger.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// Modules
import { UserModule } from './user/user.module';
import { SpaceModule } from './sapce/sapce.module';
import { BaseModule } from './base/base.module';
import { RoleModule } from './role/role.module';
import { TableMetaModule } from './table-meta/table-meta.module';
import { ColumnModule } from './column/column.module';
import { RecordModule } from './record/record.module';

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
    SpaceModule,
    BaseModule,
    RoleModule,
    TableMetaModule,
    ColumnModule,
    RecordModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
