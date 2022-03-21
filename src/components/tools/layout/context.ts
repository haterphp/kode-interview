import {createContext, Dispatch, SetStateAction} from "react";

type FilterContextType = {
    filters: string[];
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>
}

export const FilterContext = createContext<FilterContextType>({ filters: [], selectedFilters: [], setSelectedFilters: () => {} })
