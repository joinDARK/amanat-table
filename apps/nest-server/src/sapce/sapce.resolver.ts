import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SpaceService } from './sapce.service';
import { Space } from './entities/sapce.entity';
import { CreateSpaceInput } from './dto/create-sapce.input';
import { UpdateSpaceInput } from './dto/update-sapce.input';

@Resolver(() => Space)
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Mutation(() => Space)
  createSpace(@Args('createSpaceInput') createSpaceInput: CreateSpaceInput) {
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
  updateSpace(@Args('updateSpaceInput') updateSpaceInput: UpdateSpaceInput) {
    return this.spaceService.update(updateSpaceInput.id, updateSpaceInput);
  }

  @Mutation(() => Space)
  removeSpace(@Args('id', { type: () => ID }) id: string) {
    return this.spaceService.remove(id);
  }
}