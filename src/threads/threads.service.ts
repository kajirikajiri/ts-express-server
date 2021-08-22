import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scrap } from 'src/scraps/entities/scrap.entity';
import { Repository } from 'typeorm';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadRepository: Repository<Thread>,

    @InjectRepository(Scrap)
    private scrapRepository: Repository<Scrap>,
  ) {}

  async create(createThreadInput: CreateThreadInput) {
    const thread = this.threadRepository.create({
      text: createThreadInput.text,
      parentThreadId: createThreadInput.parentId,
    });

    // https://typeorm.io/#:~:text=JoinTable()%0A%20%20%20%20categories%3A%20Category%5B%5D%3B%0A%0A%7D-,%23,-Loading%20many-to
    const scrap = await this.scrapRepository.findOne(
      { id: createThreadInput.scrapId },
      { relations: ['threads'] },
    );

    scrap.threads = [...scrap.threads, thread];
    await this.scrapRepository.save(scrap);
    return thread;
  }

  findAll() {
    return this.threadRepository.find();
  }

  findOne(id: string) {
    return this.threadRepository.findOne(id);
  }

  async update(id: string, updateThreadInput: UpdateThreadInput) {
    const thread = await this.threadRepository.findOne(id);
    thread.text = updateThreadInput.text;
    this.threadRepository.save(thread);
    return thread;
  }

  async remove(id: string) {
    await this.threadRepository.softDelete(id);
    return { id };
  }
}
