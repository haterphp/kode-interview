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

    const [selectedFilters, setSelectedFilters] = useState(filters);

    const context = {
        filters,
        selectedFilters,
        setSelectedFilters
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
