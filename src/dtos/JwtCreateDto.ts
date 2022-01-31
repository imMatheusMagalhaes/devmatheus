import Roles from "../enums/Roles";

export type JwtCreateDto = {
  id: string;
  role: Roles;
  iat: number;
  exp: number;
};
