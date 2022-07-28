import {useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton'

const BlurImage = (props) => {
    const {
        preview,
        image,
        alt,
        bgColor = 'transparent',
        handleClick,
        homepage,
        loaderLoading,
        adjustImage = null,
        minHeight = "217px"
    } = props;
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
                setTimeout(() => {
                    setLoading(false);
                    if (loaderLoading) {
                        loaderLoading(false);
                    }
                }, 600)
            });
        }
        return () => {
            setLoading(false);
            if (loaderLoading) {
                loaderLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    const style = {
        minHeight: minHeight,
        overflow: "hidden",
        cursor: `${homepage ? 'auto' : 'pointer'}`
    }

    return (
        <>
            <div className="w-100 shadow-sm drop-shadow-lg h-100 loader-wrap-img" style={style}>
                {loading &&
                    <div className="loadingImage">
                        <Skeleton count={1} height="100%"/>
                    </div>
                }
                <img
                    style={{
                        width: '100%',
                        background: bgColor,
                        objectFit: adjustImage ? adjustImage : 'cover',
                        height: '100%',
                        minHeight: minHeight
                    }}
                    src={preview}
                    alt={alt}
                    width={400}
                    height={400}
                    ref={loadingImageRef}
                    className={`${homepage ? 'img-fluid isLoadingImg card-img no-cursor' : 'isLoadingImg img-fluid'}`}
                    onClick={handleClick}
                />
            </div>
        </>

    );
};

export default BlurImage;