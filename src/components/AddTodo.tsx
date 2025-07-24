import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddTodoProps{
    onAdd:(text:string)=> void;
}

export const AddTodo = ({onAdd}: AddTodoProps) => {
    const [text,setText] = useState("");

    const handleSubmit = (e:React.FormEvent)=> {
        e.preventDefault();
        if(text.trim()){
            onAdd(text.trim())
            setText("");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input value={text} onChange={(e)=> setText(e.target.value)} placeholder="Add a new todo..." className="flex-1 h-12 text-base"/>
            <Button type="submit" className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-opacity duration-300"><Plus className="h-5 w-5 mr-2" />Add</Button>
        </form>
    )
}