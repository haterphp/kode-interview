import {FC} from "react";
import {ExtendedRecipe} from "../../../services/api/recipes/types";
import List from "./inc/list";
import {Skeleton} from "../skeleton";

const IngredientList: FC<Pick<ExtendedRecipe, 'ingredients'>> = ({ ingredients }) => {
    return (
        <List.Wrapper as={"ul"}>
            {
                ingredients
                    ? ingredients.map((text, i) => <List.Text key={i} as={"li"} extra={" margin-bottom: 13px; margin-left: 20px; "}>{text}</List.Text>)
                    : Array.from({ length: 5 }, (_, i) => <Skeleton key={i} type={"text"} extra={` margin-bottom: 8px; `}/>)
            }
        </List.Wrapper>
    )
}

export default IngredientList;
