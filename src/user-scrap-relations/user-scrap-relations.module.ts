import { Module } from '@nestjs/common';
import { UserScrapRelationsService } from './user-scrap-relations.service';
import { UserScrapRelationsResolver } from './user-scrap-relations.resolver';

@Module({
  providers: [UserScrapRelationsResolver, UserScrapRelationsService],
})
export class UserScrapRelationsModule {}
