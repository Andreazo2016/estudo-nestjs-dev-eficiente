import { Inject, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  @Inject('CATEGORY_REPOSITORY')
  private readonly categoryRepository: Repository<Category>
  
  create(category: Category) {
    return this.categoryRepository.save(category)
  }

  findAll() {
    return this.categoryRepository.find({})
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({ id })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
