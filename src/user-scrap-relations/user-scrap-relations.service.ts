import { Injectable } from '@nestjs/common';
import { CreateUserScrapRelationInput } from './dto/create-user-scrap-relation.input';
import { UpdateUserScrapRelationInput } from './dto/update-user-scrap-relation.input';

@Injectable()
export class UserScrapRelationsService {
  create(createUserScrapRelationInput: CreateUserScrapRelationInput) {
    return 'This action adds a new userScrapRelation';
  }

  findAll() {
    return `This action returns all userScrapRelations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userScrapRelation`;
  }

  update(
    id: number,
    updateUserScrapRelationInput: UpdateUserScrapRelationInput,
  ) {
    return `This action updates a #${id} userScrapRelation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userScrapRelation`;
  }
}
