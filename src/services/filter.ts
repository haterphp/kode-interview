import {useState} from "react";

export type FilterBody = {
    title: string;
    cuisine: string[];
}

export const useFilter = <TState>(defaultValue: TState) => {
    const [state, setState] = useState<TState>(defaultValue);
    const [stateFiltered, setStateFiltered] = useState<TState>(defaultValue);
}
