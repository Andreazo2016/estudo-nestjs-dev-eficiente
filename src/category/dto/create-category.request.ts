import { IsNotEmpty } from "class-validator";
import { IsFieldAlreadyExists } from "src/custom-validators/unique-field-validator";

export class CreateCategoryRequest {
        
    @IsNotEmpty()
    @IsFieldAlreadyExists({ tableName: 'category' },{
        message: 'Category with name $value already exists',
    })
    name: string
}
