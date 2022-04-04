import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const CardImageCarousel = (props) =>{
    const {carouselData, handleClick, handleIndex } = props;

    return (
        <>
        <Swiper navigation={true} modules={[Navigation]}>
            {carouselData.length > 0 && carouselData.map((item,id) => {
                return(
                    <SwiperSlide key={id}>
                        <img src={item?.image} alt="carousel" onClick={(e) => { handleClick ? handleClick(handleIndex) : e.preventDefault()}} />
                    </SwiperSlide>
                )
            })
            }   
        </Swiper>
        </>
    )
}
export default CardImageCarousel;