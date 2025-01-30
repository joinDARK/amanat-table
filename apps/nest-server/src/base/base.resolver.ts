import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BaseService } from './base.service';
import { Base } from './entities/base.entity';
import { CreateBaseInput } from './dto/create-base.input';
import { UpdateBaseInput } from './dto/update-base.input';

@Resolver(() => Base)
export class BaseResolver {
  constructor(private readonly baseService: BaseService) {}

  @Mutation(() => Base)
  createBase(@Args('createBaseInput') createBaseInput: CreateBaseInput) {
    return this.baseService.create(createBaseInput);
  }

  @Query(() => [Base], { name: 'bases' })
  findAll() {
    return this.baseService.findAll();
  }

  @Query(() => Base, { name: 'base' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.baseService.findOne(id);
  }

  @Mutation(() => Base)
  updateBase(@Args('updateBaseInput') updateBaseInput: UpdateBaseInput) {
    return this.baseService.update(updateBaseInput.id, updateBaseInput);
  }

  @Mutation(() => Base)
  removeBase(@Args('id', { type: () => ID }) id: string) {
    return this.baseService.remove(id);
  }
}