import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { DataSource } from 'typeorm';
import { State } from './entities/state.entity';
import { CountryModule } from 'src/country/country.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule, CountryModule],
  controllers: [StateController],
  providers: [
    {
      provide: 'STATE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(State),
      inject: ['DATA_SOURCE'],
    },
    StateService
  ],
  exports:[StateService]
})
export class StateModule {}
