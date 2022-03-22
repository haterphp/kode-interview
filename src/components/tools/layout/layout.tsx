import {FC, useState} from "react";
import styled from "styled-components";
import Header from "./inc/header";
import {FilterContext} from "./context";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  padding: 48px 0 60px 0 ;
`

const Layout: FC<{ smallHeader?: boolean }> = ({ children, smallHeader }) => {

    const filters = [
        'Caribbean',
        'Greek',
        'French',
        'Indian',
        'Chinese',
    ];

    const calories: [number, number] = [100, 1200];

    const [selectedFilters, setSelectedFilters] = useState(JSON.parse(localStorage.getItem('cuisine')!) ?? filters);
    const [selectedCalories, setSelectedCalories] = useState(JSON.parse(localStorage.getItem('calories')!) ?? calories);

    const context = {
        filters,
        selectedFilters,
        setSelectedFilters: (values: typeof filters) => {
            setSelectedFilters(values);
            localStorage.setItem('cuisine', JSON.stringify(values))
        },
        calories,
        selectedCalories,
        setSelectedCalories: (values: typeof calories) => {
            setSelectedCalories(values);
            localStorage.setItem('calories', JSON.stringify(values))
        }
    }

    return (
        <LayoutWrapper>
            <FilterContext.Provider value={context}>
                <Header small={smallHeader || false} />
                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </FilterContext.Provider>
        </LayoutWrapper>
    )
}

export default Layout;
