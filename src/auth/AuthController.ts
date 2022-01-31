import express from "express";
import { JwtResponseDto } from "../dtos/JwtResponseDto";
import { LoginDto } from "../dtos/LoginDto";
import ErrorMessages from "../enums/ErrorMessages";
import HttpStatusCode from "../utils/HttpStatusCode";
import { AuthService } from "./AuthService";
const authRoute = express.Router();

authRoute.post("/login", async (req, res, next) => {
  const user = req.body as LoginDto;
  const login = await AuthService.login(user);
  if (login === HttpStatusCode.NOT_FOUND) {
    return res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusCode.NOT_FOUND);
  } else if (login === HttpStatusCode.UNAUTHORIZED) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send(ErrorMessages.UNAUTHORIZED);
  }
  const auth: JwtResponseDto = { auth: true, token: login };
  return res.status(HttpStatusCode.OK).send(auth);
});

export default authRoute;
