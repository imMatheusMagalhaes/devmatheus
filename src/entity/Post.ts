import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./User"

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    idPost: number

    @Column()
    titulo: string

    @Column()
    resumo: string

    @Column()
    dataCriacao: Date

    @ManyToOne(type => User, user => user.posts)
    user: User

}
