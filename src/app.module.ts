import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { isAlreadyUsedConstraint } from './custom-validators/unique-field-validator';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [DatabaseModule, AuthorModule, CategoryModule],
  controllers: [],
  providers: [isAlreadyUsedConstraint, AuthorModule],
})
export class AppModule {}
