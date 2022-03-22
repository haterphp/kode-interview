import {createContext, Dispatch, SetStateAction} from "react";

type FilterContextType = {
    filters: string[];
    selectedFilters: string[];
    setSelectedFilters: (values: FilterContextType['filters']) => void;
    calories: [number, number];
    selectedCalories: [number, number];
    setSelectedCalories: (values: FilterContextType['calories']) => void;
}

export const FilterContext = createContext<FilterContextType>({
    filters: [],
    selectedFilters: JSON.parse(localStorage.getItem('cuisine')!) ?? [],
    setSelectedFilters: () => {},
    calories: [100, 1200],
    selectedCalories:  JSON.parse(localStorage.getItem('calories')!) ?? [100, 1200],
    setSelectedCalories: () => {}
})
