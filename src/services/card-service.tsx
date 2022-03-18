import moment from "moment";
import React, {useState} from "react";
import * as _ from 'lodash';
import {plural} from "./helpers";

export const parseTimeToCard = (time: number) => {
    const d = moment.duration(time * 1000);
    const minutes = d.minutes();
    const hours = moment.duration(time * 1000).asHours();
    if (hours >= 1) return hours + " " + plural(["hour", "hours", "hours"], hours);
    else if (minutes >= 1) return minutes + " min"
    return d;
}

const DefaultPipe = (val: string) => val;

export const useGetFields = <TState, >() => {
    const [state, setState] = useState<TState | undefined>(undefined);

    const register = (newState: TState, callback?: () => void) => {
        setTimeout(() => {
            setState(newState);
            if(callback) callback();
        }, 1500);
    };

    const get = (fieldName: string, skeleton: JSX.Element | null = null, pipe: (val: any) => string = DefaultPipe): JSX.Element =>
        _.has(state, fieldName)
            ? <>{pipe(_.get(state, fieldName))}</>
            : <>{skeleton}</>;

    const getValue = (fieldName: string) => {
        return _.get(state, fieldName);
    }

    return {register, get, getValue};
}
