import {useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton'

const BlurImage = (props) => {
    const {preview, image, alt, bgColor = 'transparent', handleClick, homepage, loaderLoading} = props;
    const [loading, setLoading] = useState(true);
    const loadingImageRef = useRef(null);


    const waitForImageToLoad = (imageElement) => {
        return new Promise(resolve => {
            imageElement.onload = resolve
        })
    }
    useEffect(() => {
        setLoading(true);
        if (image) {
            waitForImageToLoad(loadingImageRef.current).then(() => {
                setLoading(false);
                if (loaderLoading) {
                    loaderLoading(false);
                }
            });
        }
    }, [image]);


    const style = {
        minHeight: "217px",
        overflow: "hidden"
    }
    return (
        <>
            <div className="shadow-sm drop-shadow-lg h-100 loader-wrap-img" style={style}>
                {loading &&
                    <div className="loadingImage">
                        <Skeleton count={1} height="100%"/>
                    </div>
                }
                <img
                    style={{
                        width: '100%',
                        background: bgColor,
                        objectFit: 'cover',
                        height: '100%',
                        minHeight: '217px'
                    }}
                    src={preview}
                    alt={alt}
                    ref={loadingImageRef}
                    className={`${homepage ? 'img-fluid isLoadingImg card-img no-cursor' : 'isLoadingImg img-fluid'}`}
                    onClick={handleClick}
                />
            </div>
        </>

    );
};

export default BlurImage;