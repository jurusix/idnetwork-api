import { Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";
import * as express from "express";
import { body } from "express-validator";

export class Routes {

  public messageController: MessageController = new MessageController();


  public routes(app: express.Application): void {

    app.get(
      "/",
      (req: Request, res: Response) => {
        res.status(200).send({
          message: "GET request successfulll!"
        });
      });

    /*  --------------messages-------------------- */
    app.post(
      "/message",
      [
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
