import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BookModule } from 'src/book/book.module';

@Module({
  imports:[BookModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
