import Layout from "../tools/layout/layout";
import LayoutComponents from "../ui-kit/layout";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    ExtendedRecipe,
    GetAllRecipesResponse,
    GetRecipeDto,
    GetRecipeResponse,
    Recipe
} from "../../services/api/recipes/types";
import {makeRequest} from "../../services/api/api";
import Actions from "../../services/api/recipes/requests";

type RecipePageParams = {
    id: string
}

const RecipePage = () => {

    const params = useParams<RecipePageParams>();
    const [recipe, setRecipe] = useState<ExtendedRecipe | undefined>(undefined);

    useEffect(() => {
        makeRequest<GetRecipeResponse, GetRecipeDto>(Actions.getById, { id: +params.id! }).then(data => {
            setRecipe(data.recipe);
        })
    }, []);

    return (
        <Layout smallHeader>
            <LayoutComponents.Container>
                {recipe?.title}
            </LayoutComponents.Container>
        </Layout>
    )
}

export default RecipePage;
