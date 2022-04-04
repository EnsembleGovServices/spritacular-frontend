import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const CardImageCarousel = (props) =>{
    const {carouselData, handleClick } = props;

    return (
        <>
        <Swiper navigation={true} modules={[Navigation]}>
            {carouselData.length > 0 && carouselData.map((item,index) => {
                return(
                    <SwiperSlide key={index}>
                        <img src={item?.image} alt="carousel" onClick={(e) => { handleClick ? handleClick(index) : e.preventDefault()}} />
                    </SwiperSlide>
                )
            })
            }   
        </Swiper>
        </>
    )
}
export default CardImageCarousel;