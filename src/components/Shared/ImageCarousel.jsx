import { useState } from "react";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import Images from "../../static/images";

const ImageCarousel = (props) =>{
    const {className} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items= [
        { src: Images.card1 },
        { src: Images.card2 },
        { src: Images.card3 }
    ]
    const itemLength = items.length - 1;

    const next = () => {
        if (animating) return;
        const nextIndex = (activeIndex === itemLength) ? 0 : (activeIndex + 1);
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = (activeIndex === 0) ? itemLength : (activeIndex - 1);
        setActiveIndex(nextIndex);
    };
    const carouselContent = items.map((item, index) => {
        return (
            <CarouselItem
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
                key={index}
            >
                <img src={item.src} alt="carousel" />
            </CarouselItem>
        );
      });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
            className={className}
        >
            {carouselContent}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={()=> previous()}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={()=> next()}
            />
        </Carousel>
    )
}
export default ImageCarousel;