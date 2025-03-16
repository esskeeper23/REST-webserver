import { Request, Response } from "express";
import { prisma } from "../../data/postgres";



export class TodosController {

    //* DI
    constructor() {  }


    public getTodos = async (req: Request, res: Response) => {
      const todo = await prisma.todo.findMany()

        return res.json(todo);
      }

    public getTodoById = async (req: Request, res: Response) => {
      const id = +req.params.id;
      if ( isNaN(id) ) return res.status(400).json({message: 'Invalid id provided'})

      const todo = await prisma.todo.findUnique({
        where: {id}
      });

      ( todo )
      ? res.status(200).json(todo)
      : res.status(404).json({ message: `TODO with id ${id} not found`})
    }

    public createTodo = async (req: Request, res: Response) => {
      const { text } = req.body;

      if( !text) return res.status(400).json({message: 'Text is required'})

      const todo = await prisma.todo.create({
        data: {
          text
        }
      })

      return res.json(todo);
    }


    public updateTodo = async (req: Request, res: Response) => {
      
      const id = +req.params.id;
      if ( isNaN(id) ) return res.status(400).json({message: 'Invalid id provided'})
        
      const todo = await prisma.todo.findUnique({where: {id}});

      if ( !todo ) return res.status(400).json({message: `Todo with id ${id} not found`})
      
      const { text, completedAt } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {
          text, 
          completedAt: (completedAt ) ? new Date(completedAt) : null
        }
      })
        

      return res.json( {todo, updatedTodo} );

    }


    public deleteTodo = async (req: Request, res: Response) => {

      const id = +req.params.id;

      if ( isNaN(id) ) return res.status(400).json({ message: 'Invalid id provided'});

      const todo = await prisma.todo.findUnique({where: {id}})

      if ( !todo ) return res.status(404).json({ message: `todo with id ${id} not found` })

      const deletedTodo = await prisma.todo.delete({where: {id}});
      
      ( deletedTodo )
        ? res.json( deletedTodo )
        : res.status(400).json({ error: `Todo with id: ${id} not found`})

    }
 
}