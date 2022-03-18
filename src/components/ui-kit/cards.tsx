import styled from "styled-components";
import * as _ from 'lodash';
import Typography from "./typography";

const Card = {
    Wrapper: styled.article`
      overflow: hidden;
      border-radius: 8px;
      box-shadow: ${({ theme }) => _.get(theme, 'elevations.easy')};
      min-width: 250px;
      cursor: pointer;
      min-height: 384px;
    `,
    Image: styled.img`
      height: 100%;
      width: 100%;
      object-fit: cover;
    `,
    Content: styled.div`
      padding: 24px;
    `,
    Title: styled(Typography.H3)`
      margin-bottom: 8px;
      line-height: 28px;
    `,
    Text: styled(Typography.Body)`
      line-height: 24px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 8px;
    `,
    Chip: styled.div<{ extra?: string }>`
      padding: 8px 12px;
      font-size: 12px;
      border-radius: 1.5rem;
      background: ${({ theme }) => _.get(theme, 'colors.base1')};
      font-family: ${({ theme }) => _.get(theme, 'fonts.chip').family.join(', ')};
      
      ${({ extra }) => extra}
    `,
    ImageContainer: styled.div`
      position: relative;
      height: 196px;
    `,
    ChipContainer: styled.div`
      position: absolute;
      right: 16px;
      bottom: 16px;
      display: flex;
      align-items: center;
      
      & > *:not(:first-child) {
        margin-left: 8px;
      }
    `
};

export default Card;
