import moment from "moment";
import React, {useState} from "react";
import styled, {DefaultTheme, keyframes, ThemedCssFunction} from "styled-components";
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

const SkeletonAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

type SkeletonProps = {
    type: "title" | "text" | "image";
    extra?: string;
}

const skeletonOptions = {
    height: {
        title: 48,
        text: 16
    }
};

export const Skeleton = styled.span<SkeletonProps>`
  //padding: 6px;
  display: block;
  height: ${({ type }) => _.get(skeletonOptions, `height.${type}`) || "100%"}px;
  width: 100%;
  border-radius: .35rem;

  background: #f6f7f8;
  background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
  background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: repeat;
  background-size: 800px 104px;
  
  animation: 1s infinite linear ${SkeletonAnimation};
  
  ${({ extra }) => extra}
  
`

const DefaultPipe = (val: string) => val;

export const useGetFields = <TState, >() => {
    const [state, setState] = useState<TState | undefined>(undefined);

    const register = (newState: TState, callback?: () => void) => {
        setTimeout(() => {
            setState(newState);
            if(callback) callback();
        }, 1000);
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
