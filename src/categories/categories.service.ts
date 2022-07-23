import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorires } from './entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categorires)
    private readonly categoriesRepository: Repository<Categorires>,
  ) {}

  async create(name: string) {
    const isNameExists = await this.categoriesRepository.findOne({
      where: { name },
    });
    if (isNameExists) {
      throw new ForbiddenException(` ${name} 은 존재하는 카테고리입니다.`);
    }
    const category = new Categorires();
    category.name = name;
    return await this.categoriesRepository.save(category);
  }

  async delete(categoryId: number) {
    const isCategoryIdExists = await this.isCategoryId(categoryId);
    console.log(isCategoryIdExists);
    if (!isCategoryIdExists) {
      throw new NotFoundException('존제 하지 않는 카테고리 입니다.');
    }

    return await this.categoriesRepository.delete({
      categoryId,
    });
  }

  async isCategoryId(categoryId) {
    return await this.categoriesRepository.findOne({ where: { categoryId } });
  }

  async list() {
    return await this.categoriesRepository.find();
  }

  async get(categoryId: number) {
    return await this.isCategoryId(categoryId);
  }

  async update(name: string, categoryId: number) {
    const isCategory = await this.isCategoryId(categoryId);

    if (!isCategory) {
      throw new NotFoundException(`존재하지 않는 카테고리입니다.`);
    }

    return await this.categoriesRepository.update(categoryId, { name });
  }
}
