import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, ValidateNested } from "class-validator";
import { isCpfOrCnpj } from "src/custom-validators/cpf-or-cnpj-validator";
import { IsExists } from "src/custom-validators/exists-validator";
import { getOnlyNumber } from "src/util/utils";
import { CartDraftOrderRequest } from "./cart-draft-order.dto";
import { Book } from "src/book/entities/book.entity";

export class CreateDraftOrderRequest {

    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    lastname:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @Transform((params) => getOnlyNumber(params.value))
    phone:string;
    @IsNotEmpty()
    @isCpfOrCnpj({
        message: 'the $value is not a cpf/cnpj valid',
    })
    @Transform((params) => getOnlyNumber(params.value))
    document:string;
    @IsNotEmpty()
    street:string;
    @IsNotEmpty()
    complement:string;
    @IsNotEmpty()
    @Transform((params) => getOnlyNumber(params.value))
    zip_code:string;
    @IsNotEmpty()
    @IsExists({ tableName: 'category', field: 'id' }, {
        message: 'Category with id $value does not exists',
    })
    country_id:number;
    @IsNotEmpty()
    @IsExists({ tableName: 'state', field: 'id' }, {
        message: 'State with id $value does not exists',
    })
    state_id:number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CartDraftOrderRequest)
    cart: CartDraftOrderRequest;


    isValidTotalPrice(books: Book[]) {
        let total = 0
        for (const book of books) {
            const item = this.cart.itens.find(item => item.book_id === book.id)
            total += (item.quantity * book.price)
        }
        return total === this.cart.total
    }
}
