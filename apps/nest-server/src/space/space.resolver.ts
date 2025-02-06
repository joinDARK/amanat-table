import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { SpaceService } from './space.service';
import { Space } from './entities/space.entity';
import { CreateSpaceInput } from './dto/create-space.input';
import { UpdateSpaceInput } from './dto/update-space.input';
import { UseInterceptors } from '@nestjs/common';
import { RecordHistoryInterceptor } from '../record-history/record-history.interceptor';

@Resolver(() => Space)
@UseInterceptors(RecordHistoryInterceptor)
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Mutation(() => Space)
  createSpace(@Args('createSpaceInput') createSpaceInput: CreateSpaceInput, @Context() context: any,) {
    context.req.tableName = "Пространство (space)";
    return this.spaceService.create(createSpaceInput);
  }

  @Query(() => [Space], { name: 'spaces' })
  findAll() {
    return this.spaceService.findAll();
  }

  @Query(() => Space, { name: 'space' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.spaceService.findOne(id);
  }

  @Mutation(() => Space)
  updateSpace(@Args('updateSpaceInput') updateSpaceInput: UpdateSpaceInput, @Context() context: any,) {
    context.req.tableName = "Пространство (space)";
    return this.spaceService.update(updateSpaceInput.id, updateSpaceInput);
  }

  @Mutation(() => Space)
  removeSpace(@Args('id', { type: () => ID }) id: string, @Context() context: any,) {
    context.req.tableName = "Пространство (space)";
    return this.spaceService.remove(id);
  }
}
