import { FilterType } from "./FilterType";

export interface TodoFilterProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    counts: {
        all: number;
        active: number;
        completed: number;
    }
}