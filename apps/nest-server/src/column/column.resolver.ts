import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Resolver(() => Column)

export class ColumnResolver {
  constructor(private readonly columnService: ColumnService) {}

  @Mutation(() => Column)
  createColumn(
    @Args('createColumnInput') createColumnInput: CreateColumnInput,
  ) {
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
  ) {
    return this.columnService.update(id, updateColumnInput);
  }

  @Mutation(() => Column)
  removeColumn(@Args('id') id: string) {

    return this.columnService.remove(id);
  }
}
