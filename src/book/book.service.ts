import { Inject, Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  @Inject('BOOK_REPOSITORY')
  private readonly bookRepository: Repository<Book>

  create(book: Book) {
    return this.bookRepository.save(book)
  }

  findAll() {
    return this.bookRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
