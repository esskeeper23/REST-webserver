import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";



export abstract class TodoDatasource {
    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>

    //todo: paginacion 
    abstract getAll(): Promise<TodoEntity>

    abstract findById( id: number ): Promise<TodoEntity>
    abstract update( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>
    abstract detele( id: number ): Promise<TodoEntity>
}