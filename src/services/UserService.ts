import { DeleteResult, UpdateResult } from "typeorm"
import { User } from "../entity/User"

export class UserService {

    public static async findAll(): Promise<User[]> {
        const allUsers = await User.find()
        return allUsers
    }

    public static async save(userToSave: User): Promise<User> {
        const user = new User()
        user.nome = userToSave.nome
        user.email = userToSave.email
        user.info = userToSave.info
        const createdUser = await user.save()
        return createdUser
    }
    public static async delete(id: string): Promise<DeleteResult> {
        const deleteUser = User.delete(id)
        return deleteUser
    }
    public static async update(id: string, user: User): Promise<UpdateResult> {
        const updatedUser = await User.update(id, user)
        return updatedUser
    }
}
