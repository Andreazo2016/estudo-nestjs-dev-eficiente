import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import { OrderService } from './order.service';
import { CreateDraftOrderRequest } from './dto/create-draft-order.dto';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';
import { BookService } from 'src/book/book.service';
import { StateService } from 'src/state/state.service';
import { CountryService } from 'src/country/country.service';
import { Address } from 'src/address/entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { Item } from 'src/item/entities/item.entity';
import { Country } from 'src/country/entities/country.entity';
import { State } from 'src/state/entities/state.entity';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly bookService: BookService,
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
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
    const country: Country = await this.countryService.findOne(createDraftOrderRequest.country_id)
      const state: State = await this.stateService.findOne(createDraftOrderRequest.state_id)
      const c = new Country({ id: country.id, name: country.name, state })
      const user = new User({
        name: createDraftOrderRequest.name,
        last_name: createDraftOrderRequest.lastname,
        document: createDraftOrderRequest.document,
        email: createDraftOrderRequest.email,
        phone: createDraftOrderRequest.phone
      })

      const address = new Address({
        complement: createDraftOrderRequest.complement,
        country: c,
        street: createDraftOrderRequest.street,
        zip_code: createDraftOrderRequest.zip_code,
        user
      })
  
      const items: Item[] = books.map(book => {
        const draftItem = createDraftOrderRequest.cart.itens.find(item => item.book_id === book.id)
        return new Item({
          name: book.title,
          price: book.price,
          quantity: draftItem.quantity,
        })
      })
      const order = new Order({
        user,
        items
      })
      const orderSaved = await this.orderService.create(order);
      return response.status(HttpStatus.CREATED).send({
        id: orderSaved.id
      })
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
