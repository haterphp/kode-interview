import styled, {css} from "styled-components";
import Typography from "../../../ui-kit/typography";
import {FC} from "react";

const List = {
    Wrapper: styled.div``,
    Icon: ({ Component }: { Component: FC }) => <Component/>,
    Text: styled(Typography.Body)`
      line-height: 24px;
    `,
    Item: styled.div`
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      
      & > :last-child {
        margin-left: 8px;
        width: 90%;
      }
    `
}

export default List;
