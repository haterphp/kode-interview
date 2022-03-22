import styled from "styled-components";
import {MouseEventHandler, useEffect, useState} from "react";
import * as _ from 'lodash';
import {log} from "util";

type RippleContainerProps = {
    color: string;
    duration: number;
};

const RippleContainer = styled.div<RippleContainerProps>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  //overflow: hidden;
  position: absolute;
  border-radius: inherit;

  span {
    position: absolute;
    transform: scale(0);
    border-radius: 100%;
    opacity: 0.25;
    background-color: ${({ color, theme }) => _.get(theme, color) || color};
    animation-name: ripple;
    animation-duration: ${({ duration }) => duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;


type RippleItem = {
    x: number;
    y: number;
    size: number;
};

type RippleProps = {
    duration: number;
    color: string;
};

export function Ripple({ duration, color }: RippleProps) {
    const [rippleArray, setRippleArray] = useState<RippleItem[]>([]);

    useEffect(() => {
        let bounce: number | undefined;

        if (rippleArray.length > 0) {
            window.clearTimeout(bounce);

            bounce = window.setTimeout(() => {
                setRippleArray([]);
                window.clearTimeout(bounce);
            }, duration * 4);
        }

        return () => window.clearTimeout(bounce);
    }, [rippleArray.length, duration]);

    const addRipple: MouseEventHandler<HTMLDivElement> = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;
        const x = event.nativeEvent.offsetX - size / 2;
        const y = event.nativeEvent.offsetY - size / 2;

        const newRipple = {
            x,
            y,
            size
        };

        console.log(newRipple)

        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
            rippleArray.map((ripple, index) => {
                return (
                    <span
                        key={"span" + index}
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size
                        }}
                    />
                );
            })}
        </RippleContainer>
    );
}
