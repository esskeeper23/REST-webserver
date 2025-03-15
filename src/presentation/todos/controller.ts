import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy mlik", createdAt: new Date() },
  { id: 2, text: "Buy bread", createdAt: new Date() },
  { id: 3, text: "Buy butter", createdAt: new Date() },
]


export class TodosController {

    //* DI
    constructor() {}


    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
      }

    public getTodoById = (req: Request, res: Response) => {
      const id = +req.params.id;
      if ( isNaN(id) ) return res.status(400).json({message: 'Invalid id provided'})

      const todo = todos.find( todo => todo.id === id);
      ( todo )
      ? res.status(200).json(todo)
      : res.status(404).json({ message: `TODO with id ${id} not found`})
    }

    public createTodo = (req: Request, res: Response) => {
      const body = req.body;

      res.json(body)
    }

}