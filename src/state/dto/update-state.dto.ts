import { PartialType } from '@nestjs/mapped-types';
import { CreateStateRequest } from './create-state.request';

export class UpdateStateDto extends PartialType(CreateStateRequest) {}
