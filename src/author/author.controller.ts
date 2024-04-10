import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorRequest } from './dto/create-author.request';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // proteção da borda externa
  // evitar que seja chamado o controller externamente indevidamente
  @Post()
  create(@Body() createAuthorRequest: CreateAuthorRequest) { 
    const author = new Author({
      name: createAuthorRequest.name,
      email: createAuthorRequest.email,
      description: createAuthorRequest.description,
    })
    return this.authorService.create(author);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
