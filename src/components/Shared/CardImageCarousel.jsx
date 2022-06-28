import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import BlurImage from "../Common/BlurImage";

const CardImageCarousel = (props) => {
    const { carouselData, handleClick, handleIndex, detail, loaderLoading, handleFullScreen } = props;

    return (
        <>
            <Swiper navigation={true} modules={[Navigation]}>
                {carouselData.length > 0 && carouselData.map((item, id) => {
                    return (
                        <SwiperSlide key={id}
                            onClick={(e) => handleFullScreen ? handleFullScreen((detail) ? item?.image : (item.compressed_image) ? item.compressed_image : item?.image) : e.preventDefault()}>
                            <BlurImage
                                preview={(detail) ? item?.image : (item.compressed_image) ? item.compressed_image : item?.image}
                                image={(detail) ? item?.image : (item.compressed_image) ? item.compressed_image : item?.image}
                                handleClick={(e) => {
                                    handleClick ? handleClick(handleIndex) : e.preventDefault()
                                }}
                                loaderLoading={loaderLoading}
                                alt={item?.name}
                            >
                            </BlurImage>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}
export default CardImageCarousel;