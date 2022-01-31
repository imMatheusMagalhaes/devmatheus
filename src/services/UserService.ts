import { validate } from "class-validator";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { User } from "../entities/User";
import HttpStatusCode from "../utils/HttpStatusCode";
import { cryptPassword } from "../utils/PasswordCryptor";

export class UserService {
  public static async findAll(): Promise<User[]> {
    const allUsers = await User.find();
    return allUsers;
  }

  public static async findOne(id: string): Promise<any> {
    const user = await User.findOne(id);
    if (user) return user;
    return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND);
  }

  public static async save(userToSave: CreateUserDto): Promise<any> {
    // const userExist = await User.findOne({
    //   where: { email: userToSave.email },
    // });
    const user = new User();
    user.nome = userToSave.nome;
    user.email = userToSave.email;
    user.role = userToSave.role;
    user.info = userToSave.info;
    user.senha = await cryptPassword(userToSave.senha);

    const errors = await validate(user);
    if (errors.length > 0)
      return Promise.reject().catch(() => HttpStatusCode.BAD_REQUEST);

    try {
      const createdUser = await user.save();
      if (createdUser) return createdUser;
    } catch (error) {
      return Promise.reject().catch(() => HttpStatusCode.CONFLICT);
    }

    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  public static async delete(id: string): Promise<any> {
    const deleteUser = await User.delete(id);
    if (deleteUser) return deleteUser;
    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  public static async update(id: string, user: User): Promise<any> {
    const updatedUser = await User.update(id, user);
    if (updatedUser) return updatedUser;
    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
