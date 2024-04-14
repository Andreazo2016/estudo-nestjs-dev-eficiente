import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateRequest } from './dto/create-state.request';
import { UpdateStateDto } from './dto/update-state.dto';
import { CountryService } from 'src/country/country.service';
import { State } from './entities/state.entity';

@Controller('state')
export class StateController {

  constructor(
    private readonly stateService: StateService,
    private readonly countryService: CountryService,
  ) {}

  @Post()
  async create(@Body() createStateRequest: CreateStateRequest) {
    const country = await this.countryService.findOne(createStateRequest.country_id)
    const state = new State({
      name: createStateRequest.name,
      country
    })
    return this.stateService.create(state);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
