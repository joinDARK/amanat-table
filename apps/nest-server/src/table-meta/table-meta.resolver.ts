import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TableMetaService } from './table-meta.service';
import { TableMeta } from './entities/table-meta.entity';
import { CreateTableMetaInput } from './dto/create-table-meta.input';
import { UpdateTableMetaInput } from './dto/update-table-meta.input';

@Resolver(() => TableMeta)
export class TableMetaResolver {
  constructor(private readonly tableMetaService: TableMetaService) {}

  @Mutation(() => TableMeta)
  createTableMeta(@Args('createTableMetaInput') createTableMetaInput: CreateTableMetaInput) {
    return this.tableMetaService.create(createTableMetaInput);
  }

  @Query(() => [TableMeta], { name: 'tableMetas' })
  findAll() {
    return this.tableMetaService.findAll();
  }

  @Query(() => TableMeta, { name: 'tableMeta' })
  findOne(@Args('id') id: string) {
    return this.tableMetaService.findOne(id);
  }

  @Mutation(() => TableMeta)
  updateTableMeta(
    @Args('id') id: string,
    @Args('updateTableMetaInput') updateTableMetaInput: UpdateTableMetaInput
  ) {
    return this.tableMetaService.update(id, updateTableMetaInput);
  }

  @Mutation(() => TableMeta)
  removeTableMeta(@Args('id') id: string) {
    return this.tableMetaService.remove(id);
  }
}
