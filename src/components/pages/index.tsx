import {FC, MouseEventHandler, useCallback, useContext, useEffect, useRef, useState} from "react";
import Layout from "../tools/layout/layout";
import {BaseCard} from "../tools/cards/base-card";
import LayoutComponents from "../ui-kit/layout";
import styled from "styled-components";
import {makeRequest} from "../../services/api/api";
import Actions from "../../services/api/recipes/requests";
import {GetAllRecipesResponse, Recipe} from "../../services/api/recipes/types";
import {useNavigate} from "react-router-dom";
import {SkeletonCard} from "../tools/cards/skeleton-card";
import {FilterContext, useFilter} from "../../services/filter";

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  
  & > * {
    margin: 12px 10px;
    width: calc(33% - 17px);
  }
  
  @media all and (max-width: ${({ theme }) => theme.fn.breakpoint('lg')}) {
    & > * {
      width: calc(50% - 20px);
    }
  }

  @media all and (max-width: ${({ theme }) => theme.fn.breakpoint('md')}) {
    & > * {
      width: calc(100%);
    }
  }
`

const IndexPage: FC = () => {

    const navigate = useNavigate();
    const { selectedCalories, selectedFilters } = useContext(FilterContext);
    const { filtered, handlers: {register} } = useFilter<Recipe[]>(
        undefined,
        (filter, state) => {
            console.log(filter)
            return state
                .filter(item => item.title.toLowerCase().includes(filter.title.toLowerCase()))
                .reduce((arr, item) => {
                    if(filter.cuisine.includes(item.cuisine.title)) arr = [...arr, item];
                    return arr;
                }, [] as Recipe[])
                .filter(item => item.caloricity >= filter.calories[0] && item.caloricity <= filter.calories[1]);
        },
        { title: "", cuisine: selectedFilters, calories: selectedCalories }
    );

    useEffect(() => {
        makeRequest<GetAllRecipesResponse>(Actions.getAll).then(data => {
            register(data.recipes)
            console.log('registered')
        })
    }, []);

    const handlers = {
        redirect: (id: Recipe['id']): MouseEventHandler => {
            return e => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/recipe/${id}`);
            }
        },
    }

    return (
        <Layout>
            <LayoutComponents.Container>
                <PageWrapper>
                    {
                        filtered
                            ? filtered.map(({ id, ...props }) => <BaseCard key={id} onClick={handlers.redirect(id)} {...props} />)
                            : Array.from({ length: 6 }, (_, key) => <SkeletonCard key={key}/>)
                    }
                </PageWrapper>
            </LayoutComponents.Container>
        </Layout>
    )
};

export default IndexPage;
