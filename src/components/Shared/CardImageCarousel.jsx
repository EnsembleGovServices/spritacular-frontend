import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// import "../../../node_modules/swiper/swiper.scss";
// import 'swiper/css';
// import 'swiper/css/virtual';

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
            <Swiper navigation={true} modules={[Navigation]} scrollbar={{ draggable: false }}>
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