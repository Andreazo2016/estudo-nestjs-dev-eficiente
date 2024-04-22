import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';
import { createBookRepository } from './book.repository';

@Module({
  imports: [DatabaseModule, AuthorModule, CategoryModule],
  controllers: [BookController],
  providers: [
    {
      provide: 'BOOK_REPOSITORY',
      useFactory: (dataSource: DataSource) => createBookRepository(dataSource),
      inject: ['DATA_SOURCE'],
    },
    BookService,
  ],
  exports:[
    BookService,
  ]
})

export class BookModule {}
