import styled, {css} from "styled-components";
import HeaderImg from '../../../../assets/img/header-image.png';
import {useCallback, useEffect, useRef} from "react";
import Typography from "../../../ui-kit/typography";
import Layout from "../../../ui-kit/layout";
import Control from "../../../ui-kit/form";
import SearchIcon from '../../../../assets/icons/search.svg';
import FilterIcon from '../../../../assets/icons/filterIcon.svg'
import {useForm} from "react-hook-form";
import {BaseButton, IconButton} from "../../../ui-kit/buttons";

const HeaderWrapper = styled.div<{ small?: boolean }>`
  height: ${({small}) => small ? 292 : 600}px;
  position: relative;

  background-image: url(${HeaderImg});
  background-position: top right;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
`;

const HeaderContent = styled.div`
  position: sticky;
  top: 133px;
  padding-bottom: 60px;
`

const Form = styled(Control.Form)`
  position: absolute;
  margin-top: 32px;
  display: flex;
`

const FormButton = styled(IconButton)`
  margin-left: 16px;
`

type FormBody = {
    search: string;
}

const Header = () => {

    const header = useRef<HTMLDivElement>(null);
    const {control, handleSubmit} = useForm<FormBody>();

    const handlers = {
        submit: (data: FormBody) => {
            console.log(data)
            // TODO: submit handler
        }
    }

    return (
        <HeaderWrapper ref={header}>
            <HeaderContent>
                <Layout.Container>
                    <Typography variant={"h1"}>Air Recipes</Typography>
                    <Typography variant={"body"} color={"colors.shade50"}>Best Recipes for Best People</Typography>
                    <Form onSubmit={handleSubmit(handlers.submit)}>
                        <Control.Input
                            type={"text"}
                            placeholder={"Search"}
                            IconLeft={<img src={SearchIcon} alt=""/>}
                            control={control}
                            name={"search"}
                            isSearchInput
                        />
                        <FormButton type={"button"}>
                            <img src={FilterIcon} alt=""/>
                        </FormButton>
                    </Form>
                </Layout.Container>
            </HeaderContent>
        </HeaderWrapper>
    )
};

export default Header;