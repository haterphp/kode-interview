import {FC} from "react";
import styled from "styled-components";
import Header from "./inc/header";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  padding: 48px 0 60px 0 ;
`

const Layout: FC<{ smallHeader?: boolean }> = ({ children, smallHeader }) => {
    return (
        <LayoutWrapper>
            <Header small={smallHeader || false} />
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </LayoutWrapper>
    )
}

export default Layout;
