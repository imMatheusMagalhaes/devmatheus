import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm"
import { Post } from "./Post"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    info: string

    @OneToMany(type => Post, post => post.user)
    posts: Post[]

}
