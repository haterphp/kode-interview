import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {EVENTS} from "../constants/app";
import {useEvent} from "../hooks/use-event";

export type FilterBody = {
    title: string;
    cuisine: string[];
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

    useEffect(() => setStateFiltered(state), [state])

    useEffect(() => {
        listen(EVENTS.FILTER, filterUpdateListener)
        return () => omit(EVENTS.FILTER, filterUpdateListener)
    }, [filterUpdateListener])

    const handlers = {
        register: (newState: TState) => setTimeout(() => setState(newState), 2000),
        update: (newState: TState) => {
            setStateFiltered(undefined);
            setTimeout(() => setStateFiltered(newState), 1500)
        }
    }

    return {filtered: stateFiltered, handlers};
}
