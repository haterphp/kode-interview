import styled from "styled-components";
import * as _ from 'lodash';
import {FC, MouseEventHandler, useEffect, useState} from "react";

export const BaseButton = styled.button`
  background: transparent;
  outline: none;
  border: solid 1px transparent;
  cursor: pointer;
  
  position: relative;
  overflow: hidden;
`;

const Ripple = styled.span<{ left: number, top: number }>`
  width: 20px;
  height: 20px;
  position: absolute;
  display: block;
  content: "";
  border-radius: 9999px;
  opacity: 1;
  animation: 0.9s ease 1 forwards ripple-effect;

  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`

const Content = styled.span`
  position: relative;
  z-index: 2;
`

const ButtonStyled = styled(BaseButton)``;
const IconButtonStyled = styled(BaseButton)`
  padding: 16px;
  background: ${({ theme }) => _.get(theme, 'colors.base1')};
  border-color: ${({ theme }) => _.get(theme, 'colors.shade20')};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  
  & > ${Ripple} {
    background: ${({ theme }) => _.get(theme, 'colors.shade20')};
  }
`;

const useRipple = ({ onClick }: { onClick?: MouseEventHandler }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
    }

    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), 300);
        } else setIsRippling(false);
    }, [coords]);

    useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    return {isRippling, coords, handleClick};
}

export const IconButton: FC<JSX.IntrinsicElements['button']> = ({ children, onClick, ...rest }) => {

    const {isRippling, coords, handleClick} = useRipple({ onClick })
    const props = {
        ...(_.pick(rest, ['type', 'className', 'id'])),
        onClick: handleClick
    };

    return (
        <IconButtonStyled {...props}>
            {isRippling && <Ripple left={coords.x} top={coords.y} />}
            {children}
        </IconButtonStyled>
    )
}