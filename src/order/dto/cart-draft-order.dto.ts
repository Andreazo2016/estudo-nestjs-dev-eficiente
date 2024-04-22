import { IsNotEmpty, IsPositive, ValidateNested, ArrayNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { ItemDraftOrderRequest } from './item-draft-order.dto'

export class CartDraftOrderRequest {

    @IsNotEmpty()
    @IsPositive()
    total:number;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ItemDraftOrderRequest)
    itens:ItemDraftOrderRequest[];

}
