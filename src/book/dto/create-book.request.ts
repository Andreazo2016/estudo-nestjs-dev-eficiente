import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsPositive, Length, MaxDate, Min, MinDate } from "class-validator";
import { IsExists } from "src/custom-validators/exists-validator";
import { IsFieldAlreadyExists } from "src/custom-validators/unique-field-validator";

export class CreateBookRequest {

    @IsNotEmpty()
    @IsFieldAlreadyExists({ tableName: 'book' },{
        message: 'Book with title $value already exists',
    })
    title: string;

    @IsNotEmpty()
    @Length(1,500)
    resume: string;
    sumary: string;

    @IsPositive()
    @Min(20)
    price: number;

    @IsNotEmpty()
    @IsFieldAlreadyExists({ tableName: 'book' },{
        message: 'Book with isbn $value already exists',
    })
    isbn: string;

    @Transform(({ value }) => new Date(value))
    @MinDate(new Date(new Date().toISOString()))
    release_date: Date;
    
    @IsNotEmpty()
    @IsExists({ tableName: 'category', field: 'id' }, {
        message: 'Category with id $value does not exists',
    })
    category_id: number;
    @IsNotEmpty()

    @IsExists({ tableName: 'author', field: 'id' }, {
        message: 'Author with id $value does not exists',
    })
    author_id: number;
}
