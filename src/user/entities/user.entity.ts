import { IsEmail, IsNotEmpty } from 'class-validator'
import { Address } from 'src/address/entities/address.entity';
import { BaseEntity } from 'src/author/entities/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

interface UserParams {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    document: string;
}

@Entity({ name: 'user' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @Column({ unique: true })
    email: string;

    @IsNotEmpty()
    @Column({ length: 50 })
    phone: string;

    @IsNotEmpty()
    @Column({ length: 14 })
    document: string;

    @Column()
    created_at: Date = new Date()

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[]

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(params: UserParams) {
        super()
        if (params) {
            const { name, email, phone, last_name, document } = params
            this.name = name
            this.email = email
            this.phone = phone
            this.document = document
            this.last_name = last_name
            this.created_at = new Date()
            this.validateFields(this)
        }
    }

    addAddress(address:Address) {
        if (!address) {
            throw new Error('can not be null a address')
        }

        this.addresses.push(address)
    }


}
