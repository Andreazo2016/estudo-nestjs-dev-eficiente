import { Injectable } from '@nestjs/common';
import { CreateDraftOrderRequest } from './dto/create-draft-order.dto';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';

@Injectable()
export class DraftOrderService {
  create(createDraftOrderRequest: CreateDraftOrderRequest) {
    return createDraftOrderRequest;
  }

  findAll() {
    return `This action returns all draftOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} draftOrder`;
  }

  update(id: number, updateDraftOrderDto: UpdateDraftOrderDto) {
    return `This action updates a #${id} draftOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} draftOrder`;
  }
}
