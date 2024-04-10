import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator'
import { BaseEntity } from "./base.entity"
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


interface AuthorParams {
    name: string
    email: string
    description: string
}

@Entity({ name: 'author' })
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @Column({ unique: true })
    email: string;
    @IsNotEmpty()
    @MaxLength(400)
    @Column({ length: 400 })
    description: string;
    @Column()
    created_at: Date = new Date()

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: AuthorParams) {
        super()
        if (params) {
            const { name, email, description } = params
            this.name = name
            this.email = email
            this.description = description
            this.created_at = new Date()
            this.validateFields(this)
        }
        
    }
}
