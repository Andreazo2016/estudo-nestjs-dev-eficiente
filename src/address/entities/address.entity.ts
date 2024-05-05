import { IsNotEmpty } from 'class-validator'
import { BaseEntity } from 'src/author/entities/base.entity';
import { Country } from 'src/country/entities/country.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

interface AddressParams {
    street: string;
    complement: string;
    zip_code: string;
    country: Country;
    user: User;
}

@Entity({ name: 'address' })
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    street: string;

    @Column()
    @IsNotEmpty()
    complement: string;

    @IsNotEmpty()
    @Column()
    zip_code: string;

    @Column()
    created_at: Date = new Date()


    @IsNotEmpty()
    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn({ name: "user_id" }) // anotação quem vai sempre na classe ao qual vai recerb a coluna estrangeira
    user: User;

    @OneToOne(() => Country, c => c.Address, { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'country_id' , referencedColumnName: 'id' })
    country: Country
    

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: AddressParams) {
        super()
        if (params) {
            const { street, complement, zip_code, country, user } = params
            this.street = street
            this.complement = complement
            this.zip_code = zip_code
            this.created_at = new Date()
            this.country = country
            this.user = user
            this.user.addAddress(this)
            this.validateFields(this)
        }   
    }

    addUser(user:User) {
        if(!user) {
            throw new Error('Can not set a null user')
        }
        this.user = user
    }
}
