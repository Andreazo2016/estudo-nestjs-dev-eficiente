import { Inject, Injectable } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  @Inject('AUTHOR_REPOSITORY')
  private readonly authorRepository: Repository<Author>
  
  create(author: Author) {
    return this.authorRepository.save(author)
  }

  findAll() {
    return this.authorRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  findByEmail(email:string): Promise<Author> {
    return new Promise(res => res(new Author({
      name:'teste',
      email,
      description:'descrip'
    })))
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
