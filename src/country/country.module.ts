import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DataSource } from 'typeorm';
import { Country } from './entities/country.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [CountryController],
  providers: [
    {
      provide: 'COUNTRY_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Country),
      inject: ['DATA_SOURCE'],
    },
    CountryService
  ],
  exports:[CountryService]
})
export class CountryModule {}
