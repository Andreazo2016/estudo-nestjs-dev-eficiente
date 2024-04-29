import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BookModule } from 'src/book/book.module';
import { StateModule } from 'src/state/state.module';
import { CountryModule } from 'src/country/country.module';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports:[
    BookModule,
    CountryModule,
    StateModule
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'ORDER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
      inject: ['DATA_SOURCE'],
    },
    OrderService
  ],
})
export class OrderModule {}
