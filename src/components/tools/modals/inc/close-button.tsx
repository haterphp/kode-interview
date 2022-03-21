import {FC, MouseEventHandler} from "react";
import styled from "styled-components";
import {IconButton} from "../../../ui-kit/buttons";
import CloseIcon from '../../../../assets/icons/closeIcon.svg'

const CloseButtonStyled = styled(IconButton)`
  position: absolute;
  right: 21px;
  top: 21px;
  padding: 10px;
  border: none;
`;

const CloseButton: FC<{ onRequestClose: MouseEventHandler, className?: string }> = ({ onRequestClose, className }) => {

    return (
        <CloseButtonStyled onClick={onRequestClose} className={className}>
            <img src={CloseIcon} alt=""/>
        </CloseButtonStyled>
    )
}

export default CloseButton;
