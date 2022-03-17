import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";



export const useStateWithRef = <TState>(initialState: TState): [ TState, Dispatch<SetStateAction<TState>>, MutableRefObject<TState> ] => {
    const [state, setState] = useState<TState>(initialState);
    const ref = useRef<TState>(state);

    useEffect(() => {
        ref.current = state;
    }, [state]);

    return [ state, setState, ref ];
}
