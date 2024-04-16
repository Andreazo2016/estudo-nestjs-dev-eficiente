import { Module } from '@nestjs/common';
import { DraftOrderService } from './draft-order.service';
import { DraftOrderController } from './draft-order.controller';

@Module({
  controllers: [DraftOrderController],
  providers: [DraftOrderService],
})
export class DraftOrderModule {}
