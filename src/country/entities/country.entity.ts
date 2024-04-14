import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from 'src/author/entities/base.entity';
import { IsFieldAlreadyExists } from 'src/custom-validators/unique-field-validator';
import { State } from 'src/state/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


interface CountryParams {
    name: string
}

@Entity({ name: 'country' })
export class Country extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({ unique: true })
    @IsFieldAlreadyExists({ tableName: 'country' }, {
        message:'Country with name $value already exists'
    })
    name: string;


    @OneToMany(() => State, (state) => state.country)
    states: State[]

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: CountryParams) {
        super()
        if (params) {
            const { name } = params
            this.name = name
            this.validateFields(this)
        }
    }
}