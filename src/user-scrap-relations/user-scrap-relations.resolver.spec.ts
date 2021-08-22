import { Test, TestingModule } from '@nestjs/testing';
import { UserScrapRelationsResolver } from './user-scrap-relations.resolver';
import { UserScrapRelationsService } from './user-scrap-relations.service';

describe('UserScrapRelationsResolver', () => {
  let resolver: UserScrapRelationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScrapRelationsResolver, UserScrapRelationsService],
    }).compile();

    resolver = module.get<UserScrapRelationsResolver>(
      UserScrapRelationsResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
