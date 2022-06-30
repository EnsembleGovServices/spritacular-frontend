import {useEffect, useState} from "react";

const LazyLoad = (props) => {
    const {src, alt, imageClass, converted} = props;
    const [imageSrc, setImageSrc] = useState(null)
    const [imageRef, setImageRef] = useState('')

    const onLoad = (event) => {
        event.target.classList.add('loaded')
    }
    const onError = (event) => {
        event.target.classList.add('has-error')
    }

    useEffect(() => {
        let observer
        let didCancel = false

        if (imageRef && imageSrc !== src) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 || entry.isIntersecting)
                            ) {
                                setImageSrc(src)
                                observer.unobserve(imageRef)
                            }
                        })
                    },
                    {
                        threshold: 0.01,
                        rootMargin: '75%',
                    }
                )
                observer.observe(imageRef)
            } else {
                setImageSrc(src)
            }
        }
        return () => {
            didCancel = true
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef)
            }
        }
    }, [src, imageSrc, imageRef, converted])

    return (
        <>
            <img
                className={imageClass ? imageClass + ' img-fluid' : 'img-fluid'}
                ref={setImageRef}
                src={imageSrc}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                width="32"
                height="32"
            />
        </>
    )
}

export default LazyLoad;