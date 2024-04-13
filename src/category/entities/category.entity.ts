import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator'
import { BaseEntity } from 'src/author/entities/base.entity';
import { Book } from 'src/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

interface CategoryParams {
    name: string
}

@Entity({ name: 'category' })
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({ unique: true })
    @IsNotEmpty()
    name: string;
    @Column()
    created_at: Date = new Date()

    @OneToMany(() => Book, (book) => book.category)
    books: Book[]

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(data: CategoryParams) {
        super()
        if(data) {
            this.name = data.name
        }
    }
}
