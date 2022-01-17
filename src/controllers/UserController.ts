import express from 'express'
import { User } from '../entity/User'
import { UserService } from '../services/UserService'
const userRoute = express.Router()

userRoute.get("/users", async (req, res) => {
    const allUsers = await UserService.findAll()
    return res.status(200).send(allUsers);
})

userRoute.post("/users", async (req, res) => {
    const user: User = req.body
    const createdUser = await UserService.save(user)
    return res.status(201).send(createdUser)
})
userRoute.delete("/users/:id", async (req, res) => {
    const userToDelete = req.params.id
    const userDelete = await UserService.delete(userToDelete)
    return res.status(200).send(userDelete)
})
userRoute.patch("/users/:id", async (req, res) => {
    const user: User = req.body
    const updatedUser = UserService.update(req.params.id, user)
    return res.status(200).send(updatedUser)
})

export default userRoute