import {useEffect, useState} from 'react';

const BlurImage = (props) => {
    const {preview, image, alt, bgColor = 'transparent', handleClick, homepage} = props;
    const [currentImage, setCurrentImage] = useState(preview);
    const [loading, setLoading] = useState(true);

    const fetchImage = (src) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
            setCurrentImage(loadingImage.src);
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchImage(image);
    }, []);

    return (
        <div className="shadow-sm drop-shadow-lg" style={{overflow: 'hidden'}}>
            <img
                style={{
                    filter: `${loading ? 'blur(10px)' : ''}`,
                    transition: '0.4s filter linear',
                    width: '100%',
                    background: bgColor,
                }}
                src={currentImage}
                alt={alt}
                className={`${homepage ? 'img-fluid card-img no-cursor' : 'img-fluid card-img'}`}
                onClick={handleClick}
            />
        </div>
    );
};

export default BlurImage;