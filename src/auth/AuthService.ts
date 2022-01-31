import { User } from "../entities/User";
import HttpStatusCode from "../utils/HttpStatusCode";
import { comparePassword } from "../utils/PasswordCryptor";
import { Secret, sign } from "jsonwebtoken";
import { LoginDto } from "../dtos/LoginDto";
import Roles from "../enums/Roles";

export class AuthService {
  public static async login(user: LoginDto): Promise<any> {
    const userExist = await User.findOne({ where: { email: user.email } });
    if (!userExist)
      return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND);

    const mathPassword = comparePassword(user.senha, userExist.senha);
    if (!mathPassword)
      return Promise.reject().catch(() => HttpStatusCode.UNAUTHORIZED);
    const secret = process.env.SECRET as Secret;
    const token = sign({ id: userExist.idUser, role: userExist.role }, secret, {
      expiresIn: "1H", // expires in 5min
    });
    return token;
  }
}
