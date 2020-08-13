import { Request, Response } from "express";
import { Message } from "../models/message.model";
import { validationResult, ValidationError, Result } from "express-validator";


export class MessageController {
  public async getMessages(req: Request, res: Response): Promise<any> {
    let messages: Message[];

    try {
      messages = await Message.findAll();
      res.json(messages);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public async getMessage(req: Request, res: Response): Promise<any> {
    let message: Message;

    try {
      message = await Message.findByPk(req.params.id);
      res.json(message);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public async insertMessage(req: Request, res: Response): Promise<any> {

    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    let newMessage: Message;

    try {
      newMessage = await Message.create({
        name: req.body.name,
        text: req.body.text,
      });

      res.json(newMessage);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public async updateMessage(req: Request, res: Response): Promise<any> {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    let message: Message[];
    let count: number;

    try {
      [count, message] = await Message.update(
        {
          name: req.body.name,
          text: req.body.text,
        },
        {
          where: { id: req.params.id }
        }
      );

      res.json({ success: true });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
