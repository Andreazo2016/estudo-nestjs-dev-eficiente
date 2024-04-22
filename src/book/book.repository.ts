import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';

export const createBookRepository = (dataSource: DataSource) => {
    return dataSource.getRepository(Book)
}