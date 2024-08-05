import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
    
    private todos: Todo[] = [
        {
            id: 1,
            title: 'Todo 1',
            description: 'Description 1',
            done: false
        }, {
            id: 2,
            title: 'Todo 2',
            description: 'Description 2',
            done: false
        }, {
            id: 3,
            title: 'Todo 3',
            description: 'Description 3',
            done: false
        }
    ];
    get completedTodos(): number {
        return this.todos.filter(todo => todo.done).length;
    }

    get pendingTodos(): number {
        return this.todos.filter(todo => !todo.done).length
    }

    get totalTodos(): number {
        return this.todos.length;
    }

    findAll(status: StatusArgs): Todo[] {
        return this.todos.filter(todo => status.done === null || status.done === undefined || todo.done === status.done);
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return todo;
    }

    create(todo: Todo): Todo {
        const id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
        todo.id = id;
        this.todos.push(todo);

        return todo;
    }

    update(todoInput: Todo): Todo {
        console.log({todoInput});
        this.findOne(todoInput.id);


        let updatedTodo = null;

        this.todos = this.todos.map(todo => {
            if (todo.id === todoInput.id) {
                updatedTodo = {
                    ...todo,
                    ...todoInput,
                };

                console.log({updatedTodo});
                console.log({todo});

                return updatedTodo;
            }
            return todo;
        });

        return updatedTodo;


    }

    remove(id: number): Todo {
        const removed = this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        return removed;
    }
}
