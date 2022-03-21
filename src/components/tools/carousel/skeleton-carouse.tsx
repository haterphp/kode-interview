import {FC} from "react";
import styled from "styled-components";
import {Skeleton} from "../skeleton";

const SkeletonContainer = styled.div`
  width: 100%;
`

const SkeletonMainImage = styled.div`
  width: 100%;
  height: 355px;
`

const SkeletonThumbnailContainer = styled.div`
  display: flex;
  margin-top: 16px;
`

const SkeletonThumbnail = styled.div`
  width: 56px;
  height: 56px;
  margin-right: 8px;
`

const SkeletonCarousel: FC = () => {
    return (
        <SkeletonContainer>
            <SkeletonMainImage>
                <Skeleton type={'image_large'} />
            </SkeletonMainImage>
            <SkeletonThumbnailContainer>
                <SkeletonThumbnail>
                    <Skeleton type={"image_thumbnail"}/>
                </SkeletonThumbnail>
                <SkeletonThumbnail>
                    <Skeleton type={"image_thumbnail"}/>
                </SkeletonThumbnail>
                <SkeletonThumbnail>
                    <Skeleton type={"image_thumbnail"}/>
                </SkeletonThumbnail>
            </SkeletonThumbnailContainer>
        </SkeletonContainer>
    )
}

export default SkeletonCarousel;
