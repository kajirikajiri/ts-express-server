import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScrapsService } from './scraps.service';
import { Scrap } from './entities/scrap.entity';
import { CreateScrapInput } from './dto/create-scrap.input';
import { UpdateScrapInput } from './dto/update-scrap.input';

@Resolver(() => Scrap)
export class ScrapsResolver {
  constructor(private readonly scrapsService: ScrapsService) {}

  @Mutation(() => Scrap)
  createScrap(@Args('createScrapInput') createScrapInput: CreateScrapInput) {
    return this.scrapsService.create(createScrapInput);
  }

  @Query(() => [Scrap], { name: 'scraps' })
  findAll() {
    return this.scrapsService.findAll();
  }

  @Query(() => Scrap, { name: 'scrap' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.scrapsService.findOne(id);
  }

  @Mutation(() => Scrap)
  updateScrap(@Args('updateScrapInput') updateScrapInput: UpdateScrapInput) {
    return this.scrapsService.update(updateScrapInput.id, updateScrapInput);
  }

  @Mutation(() => Scrap)
  removeScrap(@Args('id', { type: () => String }) id: string) {
    return this.scrapsService.remove(id);
  }
}
