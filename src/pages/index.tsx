import { AddTodo } from "@/components/AddTodo";
import { FilterType } from "@/types/FilterType";
import { Todo } from "@/types/Todo";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoStats } from "@/components/TodoStats";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";
const Index = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }, [todos])

  const updateTodo = useCallback((id: string, text: string) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text } : todo));
    toast({
      title: "Todo updated",
      description: "Your todo has been successfully updated.",
    });
  }, [toast]);

  const deleteTodo = useCallback((id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(prev => prev.filter(todo => todo.id !== id));

    if (todoToDelete) {
      toast({
        title: "Todo deleted",
        description: `"${todoToDelete.text}" has been removed.`,
        variant: "destructive",
      });
    }
  }, [todos, toast]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
  }), [todos]);

  const counts = useMemo(() => ({
    all: todos.length,
    active: stats.active,
    completed: stats.completed
  }), [todos.length, stats.active, stats.completed])

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">React Todo App</h1>
          <p className="text-muted-foreground">Practice React features with this beautiful todo list</p>
        </div>
        <div className="bg-card rounded-xl shadow-elegant border p-6 mb-6">
          <AddTodo onAdd={addTodo} />
          <TodoStats {...stats} />
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} counts={counts} />
        </div>
        <div className="bg-card rounded-xl shadow-elegant border p-6">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            filter={filter}
          />
        </div>
        {todos.length > 0 && (
          <div className="text-center mt-6 text-sm text-muted-foreground">
            {stats.completed} of {stats.total} todos completed
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
