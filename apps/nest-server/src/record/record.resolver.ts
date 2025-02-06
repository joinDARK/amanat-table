import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { Record } from './entities/record.entity';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordHistoryInterceptor } from '../record-history/record-history.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Resolver(() => Record)
@UseInterceptors(RecordHistoryInterceptor)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Mutation(() => Record)
  createRecord(@Args('createRecordInput') createRecordInput: CreateRecordInput, @Context() context: any,) {
    context.req.tableName = "Запись (record)";
    return this.recordService.create(createRecordInput);
  }

  @Query(() => [Record], { name: 'records' })
  findAll() {
    return this.recordService.findAll();
  }

  @Query(() => Record, { name: 'record' })
  findOne(@Args('id') id: string) {
    return this.recordService.findOne(id);
  }

  @Mutation(() => Record)
  updateRecord(
    @Args('id') id: string,
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
    @Context() context: any,
  ) {
    context.req.tableName = "Запись (record)";
    return this.recordService.update(id, updateRecordInput);
  }

  @Mutation(() => Record)
  removeRecord(@Args('id') id: string, @Context() context: any,) {
    context.req.tableName = "Запись (record)";
    return this.recordService.remove(id);
  }
}
