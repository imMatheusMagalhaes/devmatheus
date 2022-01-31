import { IsEmail } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import Roles from "../enums/Roles";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  nome: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  info: string;

  @Column()
  role: Roles;

  @Column()
  senha: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
