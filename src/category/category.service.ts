import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, user) {
    const category = {
      ...createCategoryDto,
      user: {
        id: user.id,
      },
    };

    try {
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    const queryBuilder = this.categoryRepository.createQueryBuilder('Category');
    queryBuilder.leftJoinAndSelect('Category.user', 'user');

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('Category')
      .leftJoinAndSelect('Category.user', 'user')
      .where('Category.id = :id', { id: id });

    return queryBuilder.getOne();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user) {
    const category = await this.findOne(id);

    this.checkIfUserIsOwner(category, user);

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  checkIfUserIsOwner(category, user) {
    if (category.user.id !== user.id)
      throw new UnauthorizedException('You are not the owner of this category');
  }

  async remove(id: number, user) {
    const category = await this.findOne(id);

    this.checkIfUserIsOwner(category, user);

    return this.categoryRepository.softDelete(id);
  }
}
