import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expenses')
export class Expenses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    merchant_name: string;

    @Column()
    amount_in_cents: number;

    @Column()
    currency: number;

    @Column()
    user_id: string;

    @Column()
    date_created: Date;

    @Column()
    status: string;
}
