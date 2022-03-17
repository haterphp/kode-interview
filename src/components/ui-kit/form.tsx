import styled, {DefaultTheme, StyledComponent} from "styled-components";
import * as _ from 'lodash';
import {ChangeEvent, ChangeEventHandler, FC, MouseEventHandler} from "react";
import placeholder from "lodash/fp/placeholder";
import CloseIcon from '../../assets/icons/close.svg';
import {Controller, ControllerProps} from "react-hook-form";
import {EVENTS} from "../../constants/app";
import {useEvent} from "../../hooks/use-event";

const InputGroup = styled.div`
  position: relative;
`

const IconWrapper = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: calc(50% - 10.5px);
  ${({position}) => position}: 19px;

  & > img {
    height: 18px;
  }
`

const CloseIconButton = styled.img`
  cursor: pointer;
`

const InputStyled = styled.input<{ withIcon: boolean }>`
  font-size: 16px;
  color: ${({theme}) => _.get(theme, 'colors.base0')};
  padding: ${({withIcon}) => `18px ${withIcon ? `56px` : `30px`}`};
  outline: none;

  border-radius: 2rem;
  border: solid 1px ${({theme}) => _.get(theme, 'colors.shade20')};

  transition: .2s ease-in-out;

  &:focus {
    border: solid 1px ${({theme}) => _.get(theme, 'colors.shade40')};
  }
`;

type InputProps = JSX.IntrinsicElements['input'] & {
    IconLeft?: JSX.Element;
    isSearchInput?: boolean;
    handleRemoveDataFromField: MouseEventHandler;
    handleChange: ChangeEventHandler;
}

const Input: FC<InputProps> = ({
                                   IconLeft = null,
                                   isSearchInput = false,
                                   handleChange,
                                   handleRemoveDataFromField,
                                   ...rest
                               }) => {
    const props = _.pick(rest, ['type', 'name', 'placeholder', 'value', 'className', 'id'])

    return (
        <InputGroup>
            {!!IconLeft && <IconWrapper position={"left"}>{IconLeft}</IconWrapper>}
            <InputStyled withIcon={!!IconLeft} onChange={handleChange} {...props} />
            {isSearchInput && _.get(rest, 'value') &&
                <IconWrapper position={"right"}>
                    <CloseIconButton onClick={handleRemoveDataFromField} src={CloseIcon} alt=""/>
                </IconWrapper>
            }
        </InputGroup>
    )
}

const ControlledInput: FC<Omit<InputProps, 'handleChange' | 'handleRemoveDataFromField'>
    & { control: any, name: string }> = ({name, control, ...rest}) => {

    const {dispatch} = useEvent();
    const handleChange = (onChange: (...event: any[]) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
    }

    const handlerRemoveData = (onChange: (...event: any[]) => void) => {
        return (e: unknown) => {
            dispatch<{ value: string }>(EVENTS.FILTER, { value: "" });
            onChange("")
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}}) => (
                <Input {...rest}
                       value={value}
                       handleChange={handleChange(onChange)}
                       handleRemoveDataFromField={handlerRemoveData(onChange)}
                />
            )}
        />
    )

}

const Control = {
    Form: styled.form``,
    Input: ControlledInput
}

export default Control;
