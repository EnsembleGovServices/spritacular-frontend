import { Icon } from '@iconify/react';
import useObservations from "../../hooks/useObservations";
import PropTypes from "prop-types";

const ObservationUpdateUploadedImages = (item) => {

    const { observationImages, setObservationImages } = useObservations();
    const existingObvImageData = { ...observationImages };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleUpdateImage = async (e) => {
        const fileList = e.target.files[0];
        if (fileList) {
            const image = await toBase64(fileList).catch(error => process.env.NODE_ENV === "development" && console.log('Update Image Base64: ',error));
            existingObvImageData.data[observationImages?.selected_image_index]['item'] = fileList;
            existingObvImageData.data[observationImages?.selected_image_index]['image'] = image;
            existingObvImageData.data[observationImages?.selected_image_index]['name'] = fileList.name;
            existingObvImageData.data[observationImages?.selected_image_index]['lastModified'] = fileList.lastModified;
            setObservationImages(existingObvImageData);
        }
    }

    const markTabActive = (item) => {
        setObservationImages(prev => {
            return {
                ...prev,
                selected_image_id: item?.item?.id,
                selected_image_index: item?.index
            }
        });
    }

    return (
        <>
            <div className="replace-image_wrapper position-absolute rounded-circle bg-white d-flex justify-content-center align-items-center">
                <input
                    type="file"
                    name="file"
                    id="UploadFile1"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => handleUpdateImage(e)}
                    onClick={() => markTabActive(item)}
                    className="position-absolute w-100 h-100 opacity-0 p-0"
                />
                <Icon icon="ion:sync-outline" />
            </div>
        </>
    )
}

ObservationUpdateUploadedImages.propTypes = {
    tabActive: PropTypes.func,
};
export default ObservationUpdateUploadedImages;