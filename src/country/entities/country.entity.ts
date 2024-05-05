import { IsNotEmpty } from 'class-validator'
import { Address } from 'src/address/entities/address.entity';
import { BaseEntity } from 'src/author/entities/base.entity';
import { IsFieldAlreadyExists } from 'src/custom-validators/unique-field-validator';
import { State } from 'src/state/entities/state.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';


interface CountryParams {
    id?: number;
    name: string,
    state?: State;
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


    @OneToMany(() => State, (state) => state.country, { cascade:true })
    states: State[]


    @OneToOne(() => Address, a => a.country)
    Address: Address

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: CountryParams) {
        super()
        if (params) {
            const { id, name, state } = params
            this.id = id
            this.name = name
            this.states = []
            this.states.push(state)
            this.validateFields(this)
        }
    }

    hasStates() {
        return this.states.length > 0
    }

    addState(state: State) {
        if (!state) {
            throw new Error(`can not add a null state to country`)
        }
        this.states.push(state)
    }
}
