import { Module } from '@nestjs/common';
import { ScrapsService } from './scraps.service';
import { ScrapsResolver } from './scraps.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from './entities/scrap.entity';
import { UserScrapRelation } from 'src/user-scrap-relations/entities/user-scrap-relation.entity';

@Module({
  // https://docs.nestjs.com/techniques/database#:~:text=This%20module%20uses%20the%20forFeature()%20method%20to%20define%20which%20repositories%20are%20registered%20in%20the%20current%20scope.%20With%20that%20in%20place%2C%20we%20can%20inject%20the%20UsersRepository%20into%20the%20UsersService%20using%20the%20%40InjectRepository()%20decorator%3A
  // This module uses the forFeature() method to define which repositories are registered in the current scope. With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator:
  imports: [TypeOrmModule.forFeature([Scrap, UserScrapRelation])],

  providers: [ScrapsResolver, ScrapsService],
})
export class ScrapsModule {}
