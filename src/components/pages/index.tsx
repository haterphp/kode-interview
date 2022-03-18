import {FC, MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import Layout from "../tools/layout/layout";
import {BaseCard} from "../tools/cards/base-card";
import LayoutComponents from "../ui-kit/layout";
import styled from "styled-components";
import {makeRequest} from "../../services/api/api";
import Actions from "../../services/api/recipes/requests";
import {GetAllRecipesResponse, Recipe} from "../../services/api/recipes/types";
import {EVENTS} from "../../constants/app";
import {useEvent} from "../../hooks/use-event";
import * as _ from 'lodash'
import {useStateWithRef} from "../../hooks/use-state-with-ref";
import {useNavigate} from "react-router-dom";
import {SkeletonCard} from "../tools/cards/skeleton-card";

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

    const [cards, setCards, cardsRef] = useStateWithRef<Recipe[]>([])
    const [filteredCards, setFilteredCards] = useState<Recipe[]>([]);
    const {listen, omit} = useEvent();
    const navigate = useNavigate();

    const filterCallback = useCallback((e) => {
        const value = e.detail.value;
        const cards = cardsRef.current;
        setFilteredCards(cards.filter(c => c.title.toLowerCase().includes(value)))
    }, []);

    useEffect(() => {
        makeRequest<GetAllRecipesResponse>(Actions.getAll).then(data => {
            setTimeout(() => {
                setCards(data.recipes)
                setFilteredCards(data.recipes);
            }, 2000);
        })
    }, []);

    useEffect(() => {
        listen(EVENTS.FILTER, filterCallback)
        return () => omit(EVENTS.FILTER, filterCallback)
    }, [filterCallback])

    const handleRedirect = (id: Recipe['id']): MouseEventHandler => {
        return e => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/recipe/${id}`);
        }
    }

    return (
        <Layout>
            <LayoutComponents.Container>
                <PageWrapper>
                    {
                        filteredCards.length
                            ? filteredCards.map(({ id, ...props }) => <BaseCard key={id} onClick={handleRedirect(id)} {...props} />)
                            : Array.from({ length: 6 }, (_, key) => <SkeletonCard key={key}/>)
                    }
                </PageWrapper>
            </LayoutComponents.Container>
        </Layout>
    )
};

export default IndexPage;
