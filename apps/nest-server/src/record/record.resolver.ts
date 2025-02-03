import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { Record } from './entities/record.entity';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';

@Resolver(() => Record)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Mutation(() => Record)
  createRecord(@Args('createRecordInput') createRecordInput: CreateRecordInput) {
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
  ) {
    return this.recordService.update(id, updateRecordInput);
  }

  @Mutation(() => Record)
  removeRecord(@Args('id') id: string) {
    return this.recordService.remove(id);
  }
}
