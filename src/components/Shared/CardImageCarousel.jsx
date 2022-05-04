import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';

const CardImageCarousel = (props) =>{
    const {carouselData, handleClick, handleIndex, detail } = props;

    return (
        <>
        <Swiper navigation={true} modules={[Navigation]}>
            {carouselData.length > 0 && carouselData.map((item,id) => {
                return(
                    <SwiperSlide key={id}>
                        <img src={(detail) ? item?.image : (item.compressed_image) ? item.compressed_image: item?.image} alt="carousel" onClick={(e) => { handleClick ? handleClick(handleIndex) : e.preventDefault()}} />
                    </SwiperSlide>
                )
            })
            }   
        </Swiper>
        </>
    )
}
export default CardImageCarousel;