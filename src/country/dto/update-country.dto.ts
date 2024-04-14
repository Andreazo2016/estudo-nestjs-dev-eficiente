import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryRequet } from './create-country.request';

export class UpdateCountryDto extends PartialType(CreateCountryRequet) {}
