import {FC} from "react";
import styled from "styled-components";
import Header from "./inc/header";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout: FC = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header/>
            {children}
        </LayoutWrapper>
    )
}

export default Layout;
