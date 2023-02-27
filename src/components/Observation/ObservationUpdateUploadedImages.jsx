import {Icon} from '@iconify/react';
import useObservations from "../../hooks/useObservations";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const ObservationUpdateUploadedImages = (item) => {

    const {observationImages, setObservationImages} = useObservations();
    const existingObvImageData = {...observationImages};
    const imgType = ["image/png", "image/jpeg", "image/jpg"];
    const [error, setError] = useState(null);

    // To convert and validate image 
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onloadend = () => {
            const isValidImage = imgType.includes(file.type);
            const fileSize = parseFloat((file.size / (1024 * 1024)).toFixed(2));

            if (fileSize > 5) {
                setError((prev) => {
                    return {
                        ...prev,
                        size: 'You have exceeded the max file size limit (5mb)',
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
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);

    });

    // To validate image and store it's data
    const handleUpdateImage = async (e) => {
        const fileList = e.target.files[0];
        const isValidImage = imgType.includes(fileList.type);
        const fileSize = parseFloat((fileList.size / (1024 * 1024)).toFixed(2));
        const image = await toBase64(fileList).catch(error => process.env.NODE_ENV === "development" && console.log('Update Image Base64',error));

        if (isValidImage && fileSize < 5 && fileList) {
            existingObvImageData.data[observationImages?.selected_image_index]['item'] = fileList;
            existingObvImageData.data[observationImages?.selected_image_index]['image'] = image;
            existingObvImageData.data[observationImages?.selected_image_index]['name'] = fileList.name;
            existingObvImageData.data[observationImages?.selected_image_index]['lastModified'] = fileList.lastModified;
            setObservationImages(existingObvImageData);
        }
        setError(null);
    }

    // For selected observation image
    const markTabActive = (item) => {
        setObservationImages(prev => {
            return {
                ...prev,
                selected_image_id: item?.item?.id,
                selected_image_index: item?.index
            }
        });
    };

    // Append errors in context on invalid image
    useEffect(() => {
        setObservationImages(prev => {
            return {
                ...prev,
                error: error
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <>
            <div
                className="replace-image_wrapper position-absolute rounded-circle bg-white d-flex justify-content-center align-items-center">
                <input
                    type="file"
                    name="file"
                    id="UploadFile1"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => handleUpdateImage(e)}
                    onClick={() => markTabActive(item)}
                    className="position-absolute w-100 h-100 opacity-0 p-0"
                />
                <Icon icon="ion:sync-outline"/>
            </div>
        </>
    )
}

ObservationUpdateUploadedImages.propTypes = {
    tabActive: PropTypes.func,
};
export default ObservationUpdateUploadedImages;