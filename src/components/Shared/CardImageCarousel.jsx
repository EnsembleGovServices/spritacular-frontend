import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const CardImageCarousel = (props) =>{
    const {carouselData} = props;
    // const carouselContent = items.map((item, index) => {
    //     return (
    //         <SwiperSlide key={index}>
    //             <img src={carouselData} alt="carousel" />
    //         </SwiperSlide>
    //     );
    //   });

    return (
        <>
            <Swiper navigation={true} modules={[Navigation]}>
                {/* {carouselContent} */}
                <SwiperSlide>
                    <img src={carouselData} alt="carousel" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={carouselData} alt="carousel" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}
export default CardImageCarousel;