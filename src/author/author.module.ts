import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { DataSource } from 'typeorm'
import { Author } from './entities/author.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
    AuthorService
  ],
  exports: [AuthorService]
})
export class AuthorModule {}
