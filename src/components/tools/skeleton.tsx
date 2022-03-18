import styled, {keyframes} from "styled-components";
import * as _ from "lodash";

const SkeletonAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

type SkeletonProps = {
    type: "title" | "text" | "image_large" | "image_thumbnail" | "image_card";
    extra?: string;
}

const skeletonOptions = {
    height: {
        title: 48,
        text: 16
    }
};

export const Skeleton = styled.span<SkeletonProps>`
  //padding: 6px;
  display: block;
  height: ${({type}) => _.get(skeletonOptions, `height.${type}`)
          ? _.get(skeletonOptions, `height.${type}`) + "px"
          : "100%"};
  width: 100%;
  border-radius: .35rem;

  background: #f6f7f8;
  background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
  background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: repeat;
  background-size: 800px 104px;

  animation: 1s infinite linear ${SkeletonAnimation};

  ${({extra}) => extra}

`
