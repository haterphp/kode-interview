import {createContext, Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {EVENTS} from "../constants/app";
import {useEvent} from "../hooks/use-event";
import {log} from "util";

export type FilterBody = {
    title: string;
    cuisine: string[];
    calories: [number, number];
}

type FilterContextType = {
    filters: string[];
    selectedFilters: string[];
    setSelectedFilters: (values: FilterContextType['filters']) => void;
    calories: [number, number];
    selectedCalories: [number, number];
    setSelectedCalories: (values: FilterContextType['calories']) => void;
}

const filters = [
    'Caribbean',
    'Greek',
    'French',
    'Indian',
    'Chinese',
];

const calories: [number, number] = [100, 1200];

export const FilterContext = createContext<FilterContextType>({
    filters,
    selectedFilters: JSON.parse(localStorage.getItem('cuisine')!) ?? filters,
    setSelectedFilters: () => {},
    calories: calories,
    selectedCalories:  JSON.parse(localStorage.getItem('calories')!) ?? calories,
    setSelectedCalories: () => {}
})

export const FilterProvider: FC = ({ children }) => {
    const [selectedFilters, setSelectedFilters] = useState(JSON.parse(localStorage.getItem('cuisine')!) ?? filters);
    const [selectedCalories, setSelectedCalories] = useState(JSON.parse(localStorage.getItem('calories')!) ?? calories);

    const context = {
        filters,
        selectedFilters,
        setSelectedFilters: (values: typeof filters) => {
            setSelectedFilters(values);
            localStorage.setItem('cuisine', JSON.stringify(values))
        },
        calories,
        selectedCalories,
        setSelectedCalories: (values: typeof calories) => {
            setSelectedCalories(values);
            localStorage.setItem('calories', JSON.stringify(values))
        }
    }

    return (
        <FilterContext.Provider value={context}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = <TState, TFilter = FilterBody>(
    defaultValue: TState | undefined,
    filterStrategy: (filter: TFilter, initialState: TState) => TState,
    defaultFilterValue: TFilter,
) => {
    const [state, setState] = useState<TState | undefined>(defaultValue);
    const [stateFiltered, setStateFiltered] = useState<TState | undefined>(defaultValue);
    const [filter, setFilter] = useState<TFilter>(defaultFilterValue)
    const {listen, omit} = useEvent();

    const filterUpdateListener = useCallback<(e: CustomEvent<Partial<FilterBody>>) => void>((e) => {
        setFilter(prev => ({...prev, ...e.detail}))
    }, []);

    useEffect(() => {
        if (state) {
            handlers.update(
                filterStrategy(
                    filter,
                    state
                )
            );
        }
    }, [filter])

    useEffect(() => state && setStateFiltered(filterStrategy(filter, state)), [state])

    useEffect(() => {
        listen(EVENTS.FILTER, filterUpdateListener)
        return () => omit(EVENTS.FILTER, filterUpdateListener)
    }, [filterUpdateListener])

    const handlers = {
        register: (newState: TState) => setTimeout(() => {
            setState(newState)
        }, 2000),
        update: (newState: TState) => {
            setStateFiltered(undefined);
            setTimeout(() => setStateFiltered(newState), 1500)
        }
    }

    return {filtered: stateFiltered, handlers};
}
