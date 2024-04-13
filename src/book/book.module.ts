import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [DatabaseModule, AuthorModule, CategoryModule],
  controllers: [BookController],
  providers: [
    {
      provide: 'BOOK_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
      inject: ['DATA_SOURCE'],
    },
    BookService,
  ],
})

export class BookModule {}
