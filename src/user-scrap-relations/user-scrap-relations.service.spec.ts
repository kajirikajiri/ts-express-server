import { Test, TestingModule } from '@nestjs/testing';
import { UserScrapRelationsService } from './user-scrap-relations.service';

describe('UserScrapRelationsService', () => {
  let service: UserScrapRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScrapRelationsService],
    }).compile();

    service = module.get<UserScrapRelationsService>(UserScrapRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
