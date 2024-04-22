import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import { OrderService } from './order.service';
import { CreateDraftOrderRequest } from './dto/create-draft-order.dto';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';
import { BookService } from 'src/book/book.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly bookService: BookService,
  ) {}

  @Post()
  async create(@Body() createDraftOrderRequest: CreateDraftOrderRequest, @Res() response: Response) {
    const booksId = createDraftOrderRequest.cart.itens.map(item => item.book_id)
    const books = await this.bookService.findAllByIds(booksId)
    const isValidTotalCart = createDraftOrderRequest.isValidTotalPrice(books)
    if (!isValidTotalCart) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Invalid total cart price'
      })
    }
    return this.orderService.create(createDraftOrderRequest);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftOrderDto: UpdateDraftOrderDto) {
    return this.orderService.update(+id, updateDraftOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
