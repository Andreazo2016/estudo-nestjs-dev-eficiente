import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, MaxLength, ArrayNotEmpty, ValidateNested } from 'class-validator'
import { BaseEntity } from 'src/author/entities/base.entity';
import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

interface OrderParams {
    user: User;
    items: Item[];
}

@Entity({ name: 'order' })
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    created_at: Date = new Date()

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Item)
    @OneToMany(() => Item, (item) => item.order, { cascade: true })
    items: Item[]

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => User)
    @ManyToOne(() => User, (user) => user.orders, { cascade: true })
    @JoinColumn({ name: "user_id" })
    user: User

    //proteção da borda interna
    //evitar que seja chamado indevidamente essa classe internamente
    constructor(data: OrderParams) {
        super()
        if(data) {
            this.user = data.user
            this.items = data.items.map(item => {
                item.addOrder(this)
                return item
            })
        }
    }
}
