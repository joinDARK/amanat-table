import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecordHistoryInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // Получаем HTTP-контекст
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method; // POST, PUT/PATCH, DELETE и т.д.
    
    // Получаем имя пользователя из запроса (если используется аутентификация)
    const userName: string = request.user?.login || 'Неизвестный пользователь (Ошибка)';

    // Если это update или delete, попробуем получить состояние записи до изменений.
    let before: any = null;
    let recordId: number | string | undefined = request.params?.id;

    let recordName;

    return next.handle().pipe(
      tap(async (result) => {
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

        try {
          await this.prisma.recordHistory.create({
            data: {
              recordName,
              userName,
              tableName,
              diff,
              // Поле changedAt установится по умолчанию
            },
          });
        } catch (error) {
          console.error('Ошибка при сохранении истории изменений:', error);
        }
      }),
    );
  }
}