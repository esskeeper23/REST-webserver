import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy mlik", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: null },
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
      const { text } = req.body;

      if( !text) return res.status(400).json({message: 'Text is required'})
      const newTodo = {
        id: todos.length + 1,
        text: text,
        completedAt: null
      }

      todos.push( newTodo );

      return res.json(newTodo);
    }


    public updateTodo = (req: Request, res: Response) => {
      
      const id = +req.params.id;
      if ( isNaN(id) ) return res.status(400).json({message: 'Invalid id provided'})
        
      const todo = todos.find( todo => todo.id === id);
      if ( !todo ) return res.status(400).json({message: `Todo with id ${id} not found`})
      
      const { text, completedAt } = req.body;

      todo.text = text || todo.text;
      ( completedAt === 'null')
        ? todo.completedAt = null
        : todo.completedAt = new Date( completedAt || todo.completedAt );

       res.json( todo );

    }


    public deleteTodo = (req: Request, res: Response) => {

      const id = +req.params.id;

      if ( isNaN(id) ) return res.status(400).json({ message: 'Invalid id provided'});

      const todo = todos.find( todo => todo.id === id )

      if ( !todo ) return res.status(404).json({ message: `todo with id ${id} not found` })
      
      todos.splice(todos.indexOf(todo), 1)

      return res.json( todo )

    }
 
}