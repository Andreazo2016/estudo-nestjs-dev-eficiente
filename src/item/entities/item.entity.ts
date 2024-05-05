import { IsNotEmpty, IsNumber, IsPositive, } from 'class-validator'
import { BaseEntity } from 'src/author/entities/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

interface ItemParams {
    name: string;
    price: number;
    quantity: number;
}

@Entity({ name: 'item' })
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Column()
    price: number;

    @IsPositive()
    @Column()
    quantity: number;

    @Column()
    created_at: Date = new Date()

    @ManyToOne(() => Order, o => o.items)
    @JoinColumn({ name: "order_id" })
    order: Order

    constructor(data: ItemParams) {
        super()
        if(data) {
            this.name = data.name
            this.price = data.price
            this.quantity = data.quantity
            this.validateFields(this)
        }
    }

    addOrder(order: Order) {
        if (!order) {
            throw new Error('order can not be null')
        }
        this.order = order
    }
}
