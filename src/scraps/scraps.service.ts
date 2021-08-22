import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserScrapRelation } from 'src/user-scrap-relations/entities/user-scrap-relation.entity';
import { Repository } from 'typeorm';
import { CreateScrapInput } from './dto/create-scrap.input';
import { UpdateScrapInput } from './dto/update-scrap.input';
import { Scrap } from './entities/scrap.entity';

@Injectable()
export class ScrapsService {
  constructor(
    @InjectRepository(Scrap)
    private scrapRepository: Repository<Scrap>,

    @InjectRepository(UserScrapRelation)
    private userScrapRelation: Repository<UserScrapRelation>,
  ) {}

  async create(createScrapInput: CreateScrapInput) {
    const scrap = this.scrapRepository.create({
      title: createScrapInput.title,
    });
    await this.scrapRepository.save(scrap);
    const userScrapRelation = this.userScrapRelation.create({
      userId: createScrapInput.userId,
      scrap,
    });
    await this.userScrapRelation.save(userScrapRelation);
    return scrap;
  }

  findAll() {
    return this.scrapRepository.find();
  }

  findOne(id: string) {
    return this.scrapRepository.findOne(id);
  }

  async update(id: string, updateScrapInput: UpdateScrapInput) {
    const scrap = await this.scrapRepository.findOne(id);
    scrap.title = updateScrapInput.title;
    this.scrapRepository.save(scrap);
    return scrap;
  }

  async remove(id: string) {
    const scrap = await this.scrapRepository.findOne(id, {
      relations: ['threads', 'userScrapRelations'],
    });
    await this.scrapRepository.softRemove(scrap);
    return { id };
  }
}
