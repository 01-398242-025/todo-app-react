import { FilterType } from "@/model/FilterType";
import { TodoFilterProps } from "@/types/TodoFilterProps";
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export const TodoFilter = ({ currentFilter, onFilterChange, counts }: TodoFilterProps) => {

    const filters: { key: FilterType; label: string; count: number }[] = [
        { key: 'all', label: 'All', count: counts.all },
        { key: 'active', label: 'Active', count: counts.active },
        { key: 'completed', label: 'Completed', count: counts.completed },
    ];

    return (
        <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg mb-6">
            {filters.map(({ key, label, count }) => (
                <Button key={key}
                    variant={currentFilter === key ? "default" : "ghost"}
                    onClick={() => onFilterChange(key)}
                    className={cn("flex-1 relative transition-all duration-300", currentFilter === key ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background")}
                >
                    {label}
                    <span className={cn(
                        "ml-2 px-1.5 py-0.5 text-xs rounded-full transition-colors duration-300",
                        currentFilter === key
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted-foreground/20 text-muted-foreground"
                    )}>
                        {count}
                    </span>
                </Button>
            ))}
        </div>
    );
}