import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { isAlreadyUsedConstraint } from './custom-validators/unique-field-validator';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { existsConstraint } from './custom-validators/exists-validator';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { DraftOrderModule } from './draft_order/draft-order.module';
import { cpfOrCnpjConstraint } from './custom-validators/cpf-or-cnpj-validator';

@Module({
  imports: [
    DatabaseModule,
    AuthorModule,
    CategoryModule,
    BookModule,
    CountryModule,
    StateModule,
    DraftOrderModule
  ],
  controllers: [],
  providers: [
    isAlreadyUsedConstraint,
    cpfOrCnpjConstraint,
    existsConstraint,
    AuthorModule,
    CategoryModule
  ],
})
export class AppModule {}
