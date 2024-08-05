import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) {}

    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args({type: () => StatusArgs}) status: StatusArgs
    ) {
        return this.todoService.findAll(status);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', {type: () => Int}) id: number
    ) {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    create(
        @Args('createTodoInput') createTodoInput: CreateTodoInput

    ) {

        const todo = new Todo();
        todo.title = createTodoInput.title;
        todo.description = createTodoInput.description;

        return this.todoService.create(todo);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    update(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {

        const todo = new Todo();
        todo.id = updateTodoInput.id;
        if(updateTodoInput.title) todo.title = updateTodoInput.title;
        if(updateTodoInput.description) todo.description = updateTodoInput.description;
        if(updateTodoInput.done) todo.done = updateTodoInput.done;
        return this.todoService.update(todo);
    }

    @Mutation(() => Todo, { name: 'removeTodo' })
    remove(
        @Args('id', {type: () => Int}) id: number
    ) {
        return this.todoService.remove(id);
    }

    // Aggregation
    @Query(() => Int, { name: 'totalTodos' })
    totalTodos() {
        return this.todoService.totalTodos;
    }


    @Query(() => Int, { name: 'completedTodos' })
    completedTodos() {
        return this.todoService.completedTodos;
    }
    
    @Query(() => Int, { name: 'pendingTodos' })
    pendingTodos() {
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationsType, { name: 'aggregations' })
    aggregations() {
        return {
            total: this.todoService.totalTodos,
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
        };
    }
}
