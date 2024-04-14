import { IsNotEmpty } from "class-validator";
import { BaseEntity } from "src/author/entities/base.entity";
import { Country } from "src/country/entities/country.entity";
import { IsFieldAlreadyExists } from "src/custom-validators/unique-field-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

interface StateParams {
    name: string;
    country: Country;
}

@Entity({ name: 'state' })
export class State extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({ unique: true })
    @IsFieldAlreadyExists({ tableName: 'state' }, {
        message:'State with name $value already exists'
    })
    name: string;


    @IsNotEmpty()
    @ManyToOne(() => Country)
    @JoinColumn({ name: "country_id" }) // anotação quem vai sempre na classe ao qual vai recerb a coluna estrangeira
    country: Country;

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: StateParams) {
        super()
        if (params) {
            const { name, country } = params
            this.name = name
            this.country = country
            this.validateFields(this)
        }
    }
}
