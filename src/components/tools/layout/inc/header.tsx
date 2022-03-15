import styled from "styled-components";
import HeaderImg from '../../../../assets/img/header-image.png';

const HeaderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 600px;
`;

const HeaderImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderImage src={HeaderImg} alt={"header-img"}/>
        </HeaderWrapper>
    )
};

export default Header;
