import { PartialType } from '@nestjs/mapped-types';
import { CreateDraftOrderRequest } from './create-draft-order.dto';

export class UpdateDraftOrderDto extends PartialType(CreateDraftOrderRequest) {}
