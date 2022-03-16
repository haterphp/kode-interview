import {FC} from "react";
import styled from "styled-components";
import Header from "./inc/header";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  min-height: 250vh;
  background: #000;
`

const Layout: FC = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header/>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </LayoutWrapper>
    )
}

export default Layout;
