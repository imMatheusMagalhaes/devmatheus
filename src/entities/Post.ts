import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn } from "typeorm"
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
    conteudo: string

    @CreateDateColumn()
    dataCriacao: Date

    @ManyToOne(type => User, user => user.posts, {
        eager: true
    })
    user: User

}
