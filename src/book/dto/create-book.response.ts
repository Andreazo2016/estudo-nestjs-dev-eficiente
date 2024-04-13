import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsPositive, Length, MaxDate, Min, MinDate } from "class-validator";
import { IsExists } from "src/custom-validators/exists-validator";
import { IsFieldAlreadyExists } from "src/custom-validators/unique-field-validator";
import { Book } from "../entities/book.entity";

export class CreateBookResponse {

    id: number;
    title: string;

    constructor(book: Book) {
        this.id = book.id
        this.title = book.title
    }
}
