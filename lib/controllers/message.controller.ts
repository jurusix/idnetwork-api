import App from "../app";
import { Request, Response } from "express";
import * as mysql from "mysql";
import { validationResult, ValidationError, Result } from "express-validator";


export class MessageController {
  public getMessages(req: Request, res: Response): void {
    App.pool.getConnection((err, connection) => {
      if (err) {
        res.send(err);
      }

      connection.query("SELECT * FROM message", (err, rows) => {
        connection.release();
        if (err) {
          res.send(err.sqlMessage);
          return;
        }
        res.json(rows);
      });
    });
  }

  public getMessage(req: Request, res: Response): void {
    const selectQuery: string = "SELECT * FROM message WHERE id = ?";
    const query: string = mysql.format(selectQuery, [req.params.id]);

    App.pool.getConnection((err, connection) => {
      if (err) {
        res.send(err);
        return;
      }

      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          res.send(err.sqlMessage);
          return;
        }
        res.json(rows);
      });
    });
  }

  public insertMessage(req: Request, res: Response): void {
    const insertQuery: string = "INSERT INTO message (name,text) VALUES (?,?)";
    const query: string = mysql.format(insertQuery, [req.body.name, req.body.text]);
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    App.pool.query(query, (err, response) => {
      if (err) {
        res.send(err.sqlMessage);
        return;
      }

      res.json({ success: true });
    });
  }

  public updateMessage(req: Request, res: Response): void {
    const updateQuery: string = "UPDATE message SET name = ?, text = ? WHERE id = ?";
    const query: string = mysql.format(updateQuery, [req.body.name, req.body.text, req.params.id]);
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    App.pool.query(query, (err, response) => {
      if (err) {
        res.send(err.sqlMessage);
        return;
      }

      res.json({ success: true });
    });
  }
}
