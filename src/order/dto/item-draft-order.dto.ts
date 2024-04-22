import { IsNotEmpty, IsPositive } from "class-validator";
import { IsExists } from "src/custom-validators/exists-validator";

export class ItemDraftOrderRequest {

    @IsNotEmpty()
    @IsExists({ tableName: 'book', field: 'id' }, {
        message: 'Book with id $value does not exists',
    })
    book_id:number;

    @IsNotEmpty()
    @IsPositive()
    quantity:number;
   
}
