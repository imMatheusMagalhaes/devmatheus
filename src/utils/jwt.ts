import { NextFunction, Request, RequestHandler, Response } from "express";
import { decode } from "jsonwebtoken";
import { JwtCreateDto } from "../dtos/JwtCreateDto";
import HttpStatusCode from "./HttpStatusCode";

export default function permit(role: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];
      const payload = decode(token) as JwtCreateDto;
      if (payload.role === role) {
        next();
      } else {
        res.sendStatus(HttpStatusCode.FORBIDDEN);
      }
    } else {
      res.sendStatus(HttpStatusCode.FORBIDDEN);
    }
  };
}
