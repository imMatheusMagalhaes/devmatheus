import bcrypt from "bcrypt";

export const cryptPassword = (senha: string) => {
  return bcrypt.hash(senha, 12);
};

export const comparePassword = (senha: string, hash: string) => {
  return bcrypt.compare(senha, hash);
};
