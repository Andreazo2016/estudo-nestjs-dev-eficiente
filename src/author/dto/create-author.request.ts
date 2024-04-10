import { IsEmail,IsNotEmpty, MaxLength } from 'class-validator'
import { IsFieldAlreadyExists } from '../../custom-validators/unique-field-validator'

export class CreateAuthorRequest {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsFieldAlreadyExists({ tableName: 'author' },{
        message: 'Author with email $value already exists',
    })
    email: string;
    @IsNotEmpty()
    @MaxLength(400)
    description: string;
   
}
