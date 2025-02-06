import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import { UseInterceptors } from '@nestjs/common';
import { RecordHistoryInterceptor } from '../record-history/record-history.interceptor';

@Resolver(() => Column)
@UseInterceptors(RecordHistoryInterceptor)
export class ColumnResolver {
  constructor(private readonly columnService: ColumnService) {}

  @Mutation(() => Column)
  createColumn(
    @Args('createColumnInput') createColumnInput: CreateColumnInput,
    @Context() context: any
  ) {
    context.req.tableName = "Колонка (column)"
    return this.columnService.create(createColumnInput);
  }

  @Query(() => [Column], { name: 'columns' })

  findAll() {
    return this.columnService.findAll();
  }

  @Query(() => Column, { name: 'column' })
  
  findOne(@Args('id') id: string) {
    return this.columnService.findOne(id);
  }

  @Mutation(() => Column)
  updateColumn(
    @Args('id') id: string,
    @Args('updateColumnInput') updateColumnInput: UpdateColumnInput,
    @Context() context: any
  ) {
    context.req.tableName = "Колонка (column)"
    return this.columnService.update(id, updateColumnInput);
  }

  @Mutation(() => Column)
  removeColumn(@Args('id') id: string, @Context() context: any) {
    context.req.tableName = "Колонка (column)"
    return this.columnService.remove(id);
  }
}
