import { Inject, Injectable } from '@nestjs/common';
import { State } from './entities/state.entity';
import { UpdateStateDto } from './dto/update-state.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {

  @Inject('STATE_REPOSITORY')
  private readonly stateRepository: Repository<State>

  create(state: State) {
    return this.stateRepository.save(state)
  }

  findAll() {
    return this.stateRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
