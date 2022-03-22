import styled, {css, keyframes} from "styled-components";
import * as _ from 'lodash';
import {FC, MouseEventHandler, useEffect, useState} from "react";
import Color from "color";
import {Ripple} from "./ripple";

export const BaseButton = styled.button`
  background: transparent;
  outline: none;
  border: solid 1px transparent;
  cursor: pointer;

  position: relative;
  overflow: hidden;
`;

type ButtonStyledProps = {
    variant: "filled" | "outlined",
    color: string;
}

const ButtonStyled = styled(BaseButton)<ButtonStyledProps>`
  padding: 10px 15px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;

  border-radius: 4px;
  border: solid 1px ${({theme, variant}) => variant === "outlined" ? _.get(theme, "colors.shade20") : "transparent"};
  background: ${({theme, variant, color}) => variant === "filled" ? _.get(theme, color) : "transparent"};
  color: ${({theme, variant, color}) => variant === 'outlined' ? _.get(theme, color) : _.get(theme, "colors.base1")};

  transition: background-color .2s ease-in-out,
              box-shadow .2s ease-in-out;

  ${({variant}) => variant === "filled" && css`
    &:hover {
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
  `}

  ${({variant, color}) => variant === "outlined" && css`
    &:hover {
      background: ${({theme}) => Color(_.get(theme, color)).lighten(1).hex()};
    }
  `}
`;

const IconButtonStyled = styled(BaseButton)`
  padding: 16px;
  background: ${({theme}) => _.get(theme, 'colors.base1')};
  border-color: ${({theme}) => _.get(theme, 'colors.shade20')};
  border-radius: 50%;

  transition: background-color .2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton: FC<JSX.IntrinsicElements['button']> = ({children, onClick, ...rest}) => {

    const props = {
        ...(_.pick(rest, ['type', 'className', 'id'])),
        onClick: onClick,
    };

    return (
        <IconButtonStyled {...props}>
            {children}
            <Ripple duration={1000} color={"colors.shade20"} />
        </IconButtonStyled>
    )
}

export const Button: FC<JSX.IntrinsicElements['button'] & Omit<ButtonStyledProps, 'color'> & Partial<Pick<ButtonStyledProps, 'color'>>> =
    ({children, onClick, color, ...rest}) => {
        const props = {
            ...(_.pick(rest, ['type', 'className', 'id', 'variant'])),
            onClick: onClick,
            color: color || "colors.shade50"
        };

        return (
            <ButtonStyled {...props}>
                {children}
                <Ripple duration={1000} color={props.variant === "filled" ? "colors.base1" : props.color} />
            </ButtonStyled>
        )
    }
