import {useEffect, useState} from 'react';
import ContentLoader from "react-content-loader";

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

    const style = {
        minHeight: "217px",
        overflow: "hidden"
    }

    return (
        <>
            {loading ? (
                <ContentLoader viewBox="0 0 400 300">
                    <rect x="0" y="210" rx="5" ry="5" width="400" height="10"/>
                    <rect x="0" y="0" rx="5" ry="5" width="400" height="200"/>
                    <rect x="0" y="230" rx="5" ry="5" width="400" height="10"/>
                </ContentLoader>
            ) : (
                <div className="shadow-sm drop-shadow-lg min-img-height h-100" style={style}>
                    <img
                        style={{
                            filter: `${loading ? 'blur(10px)' : ''}`,
                            transition: '0.4s filter linear',
                            width: '100%',
                            background: bgColor,
                            objectFit: 'cover',
                            height: '100%',
                            minHeight: '217px'
                        }}
                        src={currentImage}
                        alt={alt}
                        className={`${homepage ? 'img-fluid card-img no-cursor' : ''}`}
                        onClick={handleClick}
                    />
                </div>
            )}
        </>

    );
};

export default BlurImage;