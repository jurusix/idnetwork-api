import { Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";
import { AuthController } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../auth/verify-sign-up";
import { verifyToken, isAdmin } from "../auth/auth-jwt";
import * as express from "express";
import { body } from "express-validator";

export class Routes {

  private messageController: MessageController = new MessageController();
  private authController: AuthController = new AuthController();

  public routes(app: express.Application): void {

    app.get(
      "/",
      (req: Request, res: Response) => {
        res.status(200).send({
          message: "GET request successfulll!"
        });
      });


    /*  --------------Authentication-------------------- */
    app.post(
      "/auth/signup",
      [
        checkDuplicateUsernameOrEmail,
        checkRolesExisted,
        body("email")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 128 }),
        body("username")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 128 }),
        body("password")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ min: 5, max: 256 }),
      ],
      this.authController.signup
    );

    app.post("/auth/signin", this.authController.signin);


    /*  --------------messages-------------------- */
    app.post(
      "/message",
      [
        verifyToken,
        isAdmin,
        body("name")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 45 }),
        body("text")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 1024 })
      ],
      this.messageController.insertMessage
    );

    app.put(
      "/message/:id",
      [
        verifyToken,
        isAdmin,
        body("name")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 45 }),
        body("text")
          .not().isEmpty()
          .trim()
          .escape()
          .isLength({ max: 1024 })
      ],
      this.messageController.updateMessage
    );

    app.get(
      "/message/:id",
      this.messageController.getMessage
    );

    app.get(
      "/messages",
      this.messageController.getMessages
    );
  }
}
