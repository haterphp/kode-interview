import {FC} from "react";
import {ExtendedRecipe} from "../../../services/api/recipes/types";
import List from "./inc/list";
import Typography from "../../ui-kit/typography";
import styled from "styled-components";
import * as _ from 'lodash';
import {Skeleton} from "../skeleton";

const StepIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-top: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  border: solid 1px ${({ theme }) => _.get(theme, 'colors.shade20')};
  border-radius: 50%;
`;

const InstructionsList: FC<Pick<ExtendedRecipe, 'instructions'>> = ({ instructions }) => {
    return (
        <List.Wrapper as={"ul"}>
            {
                instructions
                    ? instructions.map((text, index) => (
                        <List.Item key={index}>
                            <List.Icon Component={() => <StepIcon children={<Typography.Step>{index + 1}</Typography.Step>}/>} />
                            <List.Text>{text}</List.Text>
                        </List.Item>
                    ))
                    : Array.from({ length: 5 }, (_, i) => <Skeleton key={i} type={"text"} extra={` margin-bottom: 8px; `}/>)
            }
        </List.Wrapper>
    )
}

export default InstructionsList;
