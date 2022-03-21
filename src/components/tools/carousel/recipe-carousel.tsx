import {FC, useRef, useState} from "react";
import {ExtendedRecipe} from "../../../services/api/recipes/types";
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import styled from "styled-components";
import * as _ from 'lodash';

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";
import SkeletonCarousel from "./skeleton-carouse";

const SliderImage = styled.img`
  height: 355px;
  width: 100%;
  object-fit: cover;
`;

const ThumbnailImage = styled(SliderImage)`
  height: 56px;
  width: 56px;

  border: solid 2px transparent;

  .swiper-slide-thumb-active & {
    border-color: ${({ theme }) => _.get(theme, 'colors.base0')};
  }
`

const ThumbnailSwiper = styled(Swiper)`
  margin-top: 14px;
  
  .swiper-slide {
    width: 56px !important;
    height: 56px !important;
  }
`

const RecipeCarousel: FC<Pick<ExtendedRecipe, 'images'>> = ({ images }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        images ? <>
            <Swiper
                loop={true}
                spaceBetween={10}
                grabCursor
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    images?.map((url, index) => (
                        <SwiperSlide key={index}>
                            <SliderImage src={url} alt={'image'} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <ThumbnailSwiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={8}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    images?.map((url, index) => (
                        <SwiperSlide key={index} style={{ cursor: "pointer" }}>
                            <ThumbnailImage src={url} alt={'image'} />
                        </SwiperSlide>
                    ))
                }
            </ThumbnailSwiper>
        </> : <SkeletonCarousel/>
    );
}

export default RecipeCarousel;
