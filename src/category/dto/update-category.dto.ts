import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryRequest } from './create-category.request';

export class UpdateCategoryDto extends PartialType(CreateCategoryRequest) {}
