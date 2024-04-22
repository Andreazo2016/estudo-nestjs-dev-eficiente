import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, Min, Length, MinDate } from 'class-validator'
import { Author } from 'src/author/entities/author.entity';
import { BaseEntity } from 'src/author/entities/base.entity';
import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';


interface BookParams {
    title: string
    resume: string
    isbn: string
    sumary: string
    price: number
    release_date: Date
    author: Author
    category: Category
}

@Entity({ name: 'book' })
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({ unique:true })
    title: string;

    @IsNotEmpty()
    @Length(1,500)
    @Column()
    resume: string;
    
    sumary: string;

    @IsPositive()
    @Min(20)
    @Column()
    price: number;

    @IsNotEmpty()
    @Column({ unique:true })
    isbn: string;

    @Transform(({ value }) => new Date(value))
    @MinDate(new Date(new Date().toISOString()))
    @Column()
    release_date: Date;

    @IsNotEmpty()
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @IsNotEmpty()
    @ManyToOne(() => Author)
    @JoinColumn({ name: "author_id" }) // anotação quem vai sempre na classe ao qual vai recerb a coluna estrangeira
    author: Author;

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: BookParams) {
        super()
        if (params) {
            const { title, resume, sumary, price, isbn, release_date, category, author } = params
            this.title = title
            this.resume = resume
            this.sumary = sumary
            this.price = price
            this.price = price
            this.isbn = isbn
            this.release_date = release_date
            this.category = category
            this.author = author
            this.validateFields(this)
        }
        
    }
}
