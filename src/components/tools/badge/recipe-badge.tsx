import styled, {css} from "styled-components";
import {FC} from "react";
import Typography from "../../ui-kit/typography";
import * as _ from "lodash";

const StyledBadge = styled.div`
  display: flex;
  align-items: center;
  min-width: 70px;
`

export const RecipeBadge: FC<{ Icon: FC, colorText?: string }> = ({
                                                               Icon,
                                                               children,
                                                               colorText = "colors.text.primary"
                                                           }) => {
    return (
        <StyledBadge>
            <Icon/>
            <Typography.Body extra={css`
              width: 100%;
              margin-left: 9px;
              color: ${({theme}) => _.get(theme, colorText)};
            `}>{children}</Typography.Body>
        </StyledBadge>
    )
}
