import { IsNotEmpty } from "class-validator";
import { IsExists } from "src/custom-validators/exists-validator";
import { IsFieldAlreadyExists } from "src/custom-validators/unique-field-validator";

export class CreateStateRequest {
    
    @IsNotEmpty()
    @IsFieldAlreadyExists({ tableName: 'state' }, {
        message:'State with name $value already exists'
    })
    name: string;

    @IsNotEmpty()
    @IsExists({ tableName: 'country', field: 'id' }, {
        message: 'Country with id $value does not exists',
    })
    country_id: number;
}
