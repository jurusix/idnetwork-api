import { authConfig } from "./auth.config";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export function verifyToken(req, res, next): any {
  let token: string = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
}

export function isAdmin(req, res, next): any {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i: number = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
}
