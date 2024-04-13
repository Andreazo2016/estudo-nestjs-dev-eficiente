import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { isAlreadyUsedConstraint } from './custom-validators/unique-field-validator';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { existsConstraint } from './custom-validators/exists-validator';

@Module({
  imports: [DatabaseModule, AuthorModule, CategoryModule, BookModule],
  controllers: [],
  providers: [isAlreadyUsedConstraint, existsConstraint, AuthorModule, CategoryModule],
})
export class AppModule {}
