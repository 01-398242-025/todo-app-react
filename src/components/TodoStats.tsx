import { TodoStatsProps } from "@/types/TodoStatsProps";
import { CheckCircle2, Circle, Target } from "lucide-react";

export const TodoStats = ({ total, completed, active }: TodoStatsProps) => {
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-lg shadow-card border text-center">
                <Circle className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">{total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-card border text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">{active}</div>
                <div className="text-sm text-muted-foreground">Active</div>
            </div>

            <div className="bg-card p-4 rounded-lg shadow-card border text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold text-foreground">{completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            {total > 0 && (
                <div className="col-span-3 bg-card p-4 rounded-lg shadow-card border">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${completionRate}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );

}