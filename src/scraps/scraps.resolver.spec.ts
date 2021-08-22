import { Test, TestingModule } from '@nestjs/testing';
import { ScrapsResolver } from './scraps.resolver';
import { ScrapsService } from './scraps.service';

describe('ScrapsResolver', () => {
  let resolver: ScrapsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapsResolver, ScrapsService],
    }).compile();

    resolver = module.get<ScrapsResolver>(ScrapsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
