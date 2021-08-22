import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsResolver } from './threads.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from 'src/scraps/entities/scrap.entity';
import { Thread } from './entities/thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scrap, Thread])],
  providers: [ThreadsResolver, ThreadsService],
})
export class ThreadsModule {}
