import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CATEGORY_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
      inject: ['DATA_SOURCE'],
    },
    CategoryService
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
