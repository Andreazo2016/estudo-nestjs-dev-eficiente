import { Inject, Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {

  @Inject('COUNTRY_REPOSITORY')
  private readonly countryRepository: Repository<Country>

  create(country: Country) {
    return this.countryRepository.save(country)
  }

  findAll() {
    return this.countryRepository.find({})
  }

  findOne(id: number): Promise<Country> {
    return this.countryRepository.findOneBy({ id })
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
