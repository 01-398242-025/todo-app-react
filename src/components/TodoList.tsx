import { TodoListProps } from "@/types/TodoListProps";
import { ListTodo } from 'lucide-react';
import { TodoItem } from "./TodoItem";


export const TodoList = ({ todos, onToggle, onDelete, onUpdate, filter }: TodoListProps) => {

    if (todos.length === 0) {
        const emptyMessages = {
            all: "No todos yet. Add one above to get started!",
            active: "No active todos. Great job!",
            completed: "No completed todos yet. Mark some as done!"
        };

        return (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
                <ListTodo className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{emptyMessages[filter as keyof typeof emptyMessages] || emptyMessages.all}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </div>
    );
}