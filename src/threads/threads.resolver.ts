import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThreadsService } from './threads.service';
import { Thread } from './entities/thread.entity';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';

@Resolver(() => Thread)
export class ThreadsResolver {
  constructor(private readonly threadsService: ThreadsService) {}

  @Mutation(() => Thread)
  createThread(
    @Args('createThreadInput') createThreadInput: CreateThreadInput,
  ) {
    return this.threadsService.create(createThreadInput);
  }

  @Query(() => [Thread], { name: 'threads' })
  findAll() {
    return this.threadsService.findAll();
  }

  @Query(() => Thread, { name: 'thread' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.threadsService.findOne(id);
  }

  @Mutation(() => Thread)
  updateThread(
    @Args('updateThreadInput') updateThreadInput: UpdateThreadInput,
  ) {
    return this.threadsService.update(updateThreadInput.id, updateThreadInput);
  }

  @Mutation(() => Thread)
  removeThread(@Args('id', { type: () => String }) id: string) {
    return this.threadsService.remove(id);
  }
}
