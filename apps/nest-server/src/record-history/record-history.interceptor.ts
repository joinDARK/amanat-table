import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RecordHistoryInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const contextType = context.getType<'http' | 'graphql' | 'ws' | 'rpc'>(); // Получаем тип контекста ('http', 'graphql', 'ws', 'rpc')
    // Получаем HTTP-контекст
    let request;
    let method;// POST, PUT/PATCH, DELETE и т.д.
    
    // Получаем имя пользователя из запроса (если используется аутентификация)
    let userName: string;

    // Если это update или delete, попробуем получить состояние записи до изменений.
    let before: any = null;
    let recordId: number | string | undefined;

    let recordName;

    let tableName: string;

    if (contextType === 'http') {
      // Обработка HTTP-запросов
      const httpContext = context.switchToHttp();
      request = httpContext.getRequest();
      method = request.method; // POST, PUT/PATCH, DELETE и т.д.
      userName = request.user?.login || 'Неизвестный пользователь (Ошибка)';
      recordId = request.params?.id;
      tableName = request.tableName || 'Неизвестная таблица (Ошибка)';
    } else if (contextType === 'graphql') {
      // Обработка GraphQL-запросов
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req; // Получаем HTTP-запрос из GraphQL-контекста
      const args = gqlContext.getArgs(); // Аргументы GraphQL-запроса
      recordId = args?.id; // ID записи из аргументов GraphQL
      for (const key in args) {
        const val = args[key];
        
        if(val && typeof val === 'object') {
          if ('createdBy' in val) {
            userName = val.createdBy || 'Неизвестный пользователь (Ошибка)';
            break;
          }
  
          else if('lastModifiedBy' in val){
            userName = val.lastModifiedBy || 'Неизвестный пользователь (Ошибка)';
            break;
          }
        }
      }

      const info = gqlContext.getInfo();
      const operation = info.operation.operation; // 'query', 'mutation', 'subscription'

      // Определяем метод на основе операции GraphQL
      if (operation === 'mutation') {
        const fieldName = info.fieldName; // Имя мутации
        method = this.getMethodFromGraphQLFieldName(fieldName); // Преобразуем имя мутации в метод
      } else {
        return next.handle(); // Для query и subscription ничего не логируем
      }

      recordId = gqlContext.getArgs()?.id; // ID записи из аргументов GraphQL
    } else {
      return next.handle(); // Для других типов контекста ничего не делаем
    }

    return next.handle().pipe(
      tap((result) => {
        const tableName = request.tableName || 'Неизвестная таблица (Ошибка)';
        let diff: any = {};
        // В зависимости от HTTP-метода определяем, что логировать
        if (method === 'POST') {
          // При создании записи (POST) результат содержит новое состояние записи
          diff = { after: result };
          recordName = 'Создание'
        } else if (method === 'PUT' || method === 'PATCH') {
          diff = { before, after: result };
          recordId = result.id;
          recordName = 'Обновление'
        } else if (method === 'DELETE') {
          diff = { before };
          recordName = 'Удаление'
          // recordId уже получен из параметров
        } else {
          // Для остальных методов ничего не делаем
          return;
        }
          this.prisma.recordHistory.create({
            data: {
              recordName,
              userName,
              tableName,
              diff,
              // Поле changedAt установится по умолчанию
            },
          })
          .catch((error) =>
            console.error('Ошибка при записи истории изменений:', error),
          );
      }),
    );
  }

  private getMethodFromGraphQLFieldName(fieldName: string): string {
    // Пример преобразования имени мутации в HTTP-метод
    if (fieldName.startsWith('create')) {
      return 'POST';
    } else if (fieldName.startsWith('update')) {
      return 'PUT';
    } else if (fieldName.startsWith('delete')) {
      return 'DELETE';
    }
    return 'UNKNOWN';
  }
}

