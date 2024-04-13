import { PartialType } from '@nestjs/mapped-types';
import { CreateBookRequest } from './create-book.request';

export class UpdateBookDto extends PartialType(CreateBookRequest) {}
