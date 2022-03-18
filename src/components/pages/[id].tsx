import Layout from "../tools/layout/layout";
import LayoutComponents from "../ui-kit/layout";
import {useParams} from "react-router-dom";
import {FC, useCallback, useEffect, useState} from "react";
import {
    ExtendedRecipe,
    GetAllRecipesResponse,
    GetRecipeDto,
    GetRecipeResponse,
    Recipe
} from "../../services/api/recipes/types";
import {makeRequest} from "../../services/api/api";
import Actions from "../../services/api/recipes/requests";
import {parseTimeToCard, Skeleton, useGetFields} from "../../services/card-service";
import Typography from "../ui-kit/typography";
import styled, {css} from "styled-components";
import {useEvent} from "../../hooks/use-event";
import TimeIcon from '../../assets/icons/timeIcon.svg';
import CaloriesIcon from '../../assets/icons/caloriesIcon.svg';
import CuisineIcon from '../../assets/icons/cuisineIcon.svg';
import {EVENTS} from "../../constants/app";
import {RecipeBadge} from "../tools/badge/recipe-badge";
import {DifficultyBadge} from "../tools/badge/difficulty-badge";
import IngredientList from "../tools/lists/ingredient-list";
import InstructionsList from "../tools/lists/instuctions-list";

type RecipePageParams = {
    id: string
}

const RecipePageWrapper = styled.div`
  padding-top: 60px;
  margin-left: -10px;
  margin-right: -10px;

  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  width: 50%;
  padding: 0 10px;
`;


const RecipeBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 34px;

  & > *:not(:first-child) {
    margin-left: 33px;
  }
`

const ListContainer = styled.div`
  display: block;
  margin-top: 30px;

  & ${Typography.H3} {
    margin-bottom: 16px;
  }
`

const RecipePage = () => {

    const params = useParams<RecipePageParams>();
    const recipe = useGetFields<ExtendedRecipe>();
    const {dispatch} = useEvent();

    useEffect(() => {
        makeRequest<GetRecipeResponse, GetRecipeDto>(Actions.getById, {id: +params.id!}).then(data => {
            recipe.register(data.recipe, () => {
                dispatch<ExtendedRecipe>(EVENTS.RECIPE_LOADED, data.recipe);
            });
        })
    }, []);

    return (
        <Layout smallHeader>
            <LayoutComponents.Container>
                <RecipePageWrapper>
                    <Col>
                        <Typography.H2 extra={" margin-bottom: 18px; width: 100%; "}>
                            {recipe.get('title', <Skeleton type={"title"}/>)}
                        </Typography.H2>
                        <Typography.Body extra={" margin-bottom: 16px; width: 100%; "}>
                            {recipe.get('description', <Skeleton type={"text"}/>)}
                        </Typography.Body>
                        <RecipeBadgeContainer>
                            <DifficultyBadge children={
                                recipe.get(
                                    'difficulty',
                                    <Skeleton type={"text"}/>,
                                    (val) => val.charAt(0).toUpperCase() + val.slice(1)
                                )
                            }/>
                            <RecipeBadge
                                Icon={() => <img src={TimeIcon} alt=""/>}
                                children={
                                    recipe.get(
                                    'cookTime',
                                    <Skeleton type={"text"}/>,
                                        (val) => parseTimeToCard(val as number) as string
                                    )
                                }
                            />
                            <RecipeBadge
                                Icon={() => <img src={CaloriesIcon} alt=""/>}
                                children={
                                    recipe.get(
                                        'caloricity',
                                        <Skeleton type={"text"}/>,
                                        (val) => `${val} kCal`
                                    )
                                }
                            />
                            <RecipeBadge
                                Icon={() => <img src={CuisineIcon} alt=""/>}
                                children={recipe.get('cuisine.title', <Skeleton type={"text"}/>)}
                            />
                        </RecipeBadgeContainer>
                        <ListContainer>
                            <Typography.H3>Ingredients</Typography.H3>
                            <IngredientList ingredients={recipe.getValue('ingredients')} />
                        </ListContainer>
                        <ListContainer>
                            <Typography.H3>Instructions</Typography.H3>
                            <InstructionsList instructions={recipe.getValue('instructions')}/>
                        </ListContainer>
                    </Col>
                </RecipePageWrapper>
            </LayoutComponents.Container>
        </Layout>
    )
}

export default RecipePage;
