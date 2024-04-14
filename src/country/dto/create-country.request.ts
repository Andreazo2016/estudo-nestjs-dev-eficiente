import { IsNotEmpty } from 'class-validator'
import { IsFieldAlreadyExists } from 'src/custom-validators/unique-field-validator';


export class CreateCountryRequet {

    @IsNotEmpty()
    @IsFieldAlreadyExists({ tableName: 'country' }, {
        message:'Country with name $value already exists'
    })
    name: string;
}

