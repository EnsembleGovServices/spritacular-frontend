import useObservations from "../../hooks/useObservations";
import { useEffect, useState } from "react";
import { uploadImageDefaultState } from "../../helpers/observation";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import UploadImageUI from "../Shared/UploadImageUI";

const ObservationUploadImg = (props) => {
    const { multiple, maxLimit, imageFormat, detectImage, mode, small } = props;
    const { setObservationImages, observationImages } = useObservations();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    // eslint-disable-next-line
    const [userLocation, setUserLocation] = useState({
        latitude: (auth?.user?.location_metadata?.lat) ? auth?.user?.location_metadata?.lat : 18.5204303,
        longitude: (auth?.user?.location_metadata?.lng) ? auth?.user?.location_metadata?.lng : 73.8567437
    });

    // To validate and store image
    const handleUploadImage = (e) => {
        setError(null);
        const fileList = e.target.files;
        const imgType = ["image/png", "image/jpeg", "image/jpg"]
        Array.from(fileList).forEach((item, id) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const isValidImage = imgType.includes(item.type);
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const baseImage = `data:image/png;base64,${base64String}`;
                const random = (Math.random() + 1).toString(36).substring(7) + (Math.random() + 1).toString(36).substring(20);
                const fileSize = (item.size / (1024 * 1024)).toFixed(2);
                const repeatCheck = images?.map((image, index) => {
                    return image?.lastModified === item?.lastModified && image?.name === item?.name;
                });
                const duplicate = repeatCheck.includes(true);
                if (images?.length <= (mode ? 1 : 2) && fileSize < 5 && !duplicate && isValidImage) {
                    mode ?
                        setImages([uploadImageDefaultState(random, baseImage, item, userLocation)]) :
                        setImages(prevState => [
                            ...prevState,
                            uploadImageDefaultState(random, baseImage, item, userLocation)
                        ])
                }

                if (mode) {
                    setError((prev) => {
                        return {
                            ...prev,
                            draft: 'You can not add new image',
                        }
                    })
                }
                if (images?.length > 2) {
                    setError((prev) => {
                        return {
                            ...prev,
                            count: 'You have reached the upload limit',
                        }
                    })
                }
                if (fileSize > 5) {
                    setError((prev) => {
                        return {
                            ...prev,
                            size: 'You have exceeded the max file size limit (5mb)',
                        }
                    })
                }
                if (duplicate) {
                    setError((prev) => {
                        return {
                            ...prev,
                            duplicate: 'You have already added the image, please choose other image',
                        }
                    })
                }

                if (!isValidImage) {
                    setError((prev) => {
                        return {
                            ...prev,
                            invalidImage: 'Allowed formats are "JPEG or JPG, PNG" only.',
                        }
                    })
                }

            };
            reader.readAsDataURL(item)
        })
    };

    // Stores image location
    useEffect(() => {
        let images = (observationImages?.data) ? [...observationImages?.data] : [];
        observationImages?.data?.map((item, index) => {
            const latitude = item.latitude ? item.latitude : userLocation?.latitude;
            const longitude = item.longitude ? item.longitude : userLocation?.longitude;
            return (item.latitude = latitude, item.longitude = longitude)
        })
        setImages(images)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detectImage, mode, userLocation])

    // Update context with observations images data
    useEffect(() => {
        if (images.length > 0) {
            setObservationImages({
                data: images,
                observation_count: images.length,
                selected_image_id: images?.[0]?.id,
                selected_image_index: 0
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, setObservationImages, userLocation])

    return (
        <>
            <UploadImageUI
                maxLimit={maxLimit}
                imageFormat={imageFormat}
                multiple={multiple}
                handleUploadImage={handleUploadImage}
                error={error}
                small={small}
            />
        </>
    )
}

ObservationUploadImg.propTypes = {
    userLocation: PropTypes.object,
};

export default ObservationUploadImg;