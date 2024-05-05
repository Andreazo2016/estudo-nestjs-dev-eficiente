import { Inject, Injectable } from '@nestjs/common';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

  @Inject('ORDER_REPOSITORY')
  private readonly orderRepository: Repository<Order>

  async create(order: Order) {
    return this.orderRepository.save(order); 
  }

  findAll() {
    return this.orderRepository.find({
      relations: {
        items: true,
        user: {
          addresses: {
            country: {
              states: true
            }
          }
        }
      }
    })
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
