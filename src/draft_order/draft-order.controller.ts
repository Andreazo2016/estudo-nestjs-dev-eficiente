import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DraftOrderService } from './draft-order.service';
import { CreateDraftOrderRequest } from './dto/create-draft-order.dto';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';

@Controller('draft-order')
export class DraftOrderController {
  constructor(private readonly draftOrderService: DraftOrderService) {}

  @Post()
  create(@Body() reateDraftOrderRequest: CreateDraftOrderRequest) {
    return this.draftOrderService.create(reateDraftOrderRequest);
  }

  @Get()
  findAll() {
    return this.draftOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.draftOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftOrderDto: UpdateDraftOrderDto) {
    return this.draftOrderService.update(+id, updateDraftOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.draftOrderService.remove(+id);
  }
}
