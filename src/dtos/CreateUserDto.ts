import Roles from "../enums/Roles";

export type CreateUserDto = {
  nome: string;
  email: string;
  info: string;
  role: Roles;
  senha: string;
};
