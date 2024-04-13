import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookRequest } from './dto/create-book.request';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { CategoryService } from 'src/category/category.service';
import { AuthorService } from 'src/author/author.service';
import { CreateBookResponse } from './dto/create-book.response';

//5
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly categoryService: CategoryService,
    private readonly authorService: AuthorService,
  ) {}

  @Post()
  async create(@Body() createBookRequest: CreateBookRequest) {
    const category = await this.categoryService.findOne(createBookRequest.category_id)
    const author = await this.authorService.findOne(createBookRequest.category_id)
    const book = new Book({
      ...createBookRequest,
      author,
      category
    })
    return this.bookService.create(book);
  }

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    return books.map(book => new CreateBookResponse(book))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
