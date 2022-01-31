import express from "express";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import ErrorMessages from "../enums/ErrorMessages";
import HttpStatusCode from "../utils/HttpStatusCode";
const userRoute = express.Router();

userRoute.get("/users", async (req, res) => {
  const allUsers = await UserService.findAll();
  return res.status(HttpStatusCode.OK).send(allUsers);
});

userRoute.post("/users", async (req, res) => {
  const user: User = req.body;
  const createdUser = await UserService.save(user);

  if (createdUser === HttpStatusCode.BAD_REQUEST) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .send(ErrorMessages.BAD_REQUEST);
  } else if (createdUser === HttpStatusCode.CONFLICT) {
    return res.status(HttpStatusCode.CONFLICT).send(ErrorMessages.CONFLICT);
  } else if (createdUser === HttpStatusCode.INTERNAL_SERVER_ERROR) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(ErrorMessages.INTERNAL_SERVER_ERROR);
  }

  return res.status(HttpStatusCode.CREATED).send(createdUser);
});

userRoute.delete("/users/:id", async (req, res) => {
  const userToDelete = req.params.id;
  const userDelete = await UserService.delete(userToDelete);
  if (userDelete === HttpStatusCode.INTERNAL_SERVER_ERROR)
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(ErrorMessages.INTERNAL_SERVER_ERROR);
  return res.status(HttpStatusCode.CREATED).send(userDelete);
});

userRoute.patch("/users/:id", async (req, res) => {
  const user: User = req.body;
  const updatedUser = await UserService.update(req.params.id, user);
  if (updatedUser === HttpStatusCode.INTERNAL_SERVER_ERROR)
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(ErrorMessages.INTERNAL_SERVER_ERROR);
  return res.status(HttpStatusCode.CREATED).send(updatedUser);
});

export default userRoute;
