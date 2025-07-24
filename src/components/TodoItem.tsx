import { cn } from "@/lib/utils";
import { TodoItemProps } from "@/types/TodoItemProps";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Check, Edit2, X } from "lucide-react";
import { Input } from "./ui/input";

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim()) {
            onUpdate(todo.id, editText.trim());
        }
        setIsEditing(!isEditing);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
        if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <div className={cn(
            "group flex items-center gap-3 p-4 bg-card rounded-lg shadow-card border transition-all duration-300 hover:shadow-elegant animate-fade-in",
            todo.completed && "opacity-75"
        )}>
            <button
                onClick={() => onToggle(todo.id)}
                className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
                    todo.completed
                        ? "bg-success border-success text-success-foreground"
                        : "border-border hover:border-primary"
                )}
            >
                {todo.completed && <Check className="w-3 h-3" />}
            </button>

            {isEditing ? (
                <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onBlur={handleEdit}
                    className="flex-1"
                    autoFocus
                />
            ) : (
                <span
                    className={cn(
                        "flex-1 transition-all duration-300",
                        todo.completed && "line-through text-muted-foreground"
                    )}
                >
                    {todo.text}
                </span>
            )}

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                    <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(todo.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                    <X className="w-3.5 h-3.5" />
                </Button>
            </div>
        </div>
    );
};