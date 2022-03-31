import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const CardImageCarousel = (props) =>{
    const {carouselData} = props;

    return (
        <>
        <Swiper navigation={true} modules={[Navigation]}>
        {carouselData.length > 0 && carouselData.map((item,index) => {
            return(
                <SwiperSlide key={index}>
                    <img src={item?.image} alt="carousel" />
                </SwiperSlide>
            )
        })
    }
    </Swiper>
            
        </>
    )
}
export default CardImageCarousel;