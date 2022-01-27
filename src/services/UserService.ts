import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import HttpStatusCode from "../utils/HttpStatusCode";

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

  public static async save(userToSave: User): Promise<any> {
    const user = new User();
    const userExist = await User.findOne({
      where: { email: userToSave.email },
    });
    console.log(userExist);
    if (!userExist) {
      user.nome = userToSave.nome;
      user.email = userToSave.email;
      user.info = userToSave.info;
      const createdUser = await user.save();
      if (createdUser) return createdUser;
    } else {
      return userExist;
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
