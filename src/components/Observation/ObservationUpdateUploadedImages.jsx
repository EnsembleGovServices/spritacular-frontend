import {Input} from "reactstrap";
import { Icon } from '@iconify/react';
import useObservations from "../../hooks/useObservations";

const ObservationUpdateUploadedImages = (existingItem) => {

    const {observationImages, setObservationImages} = useObservations();
    const existingObvImageData = {...observationImages};

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleUpdateImage = async (e) => {
        const fileList = e.target.files[0];
        const image = await toBase64(fileList).catch(error => console.log(error));

        existingObvImageData.data[observationImages?.selected_image_index]['item'] = fileList;
        existingObvImageData.data[observationImages?.selected_image_index]['image'] = image;
        existingObvImageData.data[observationImages?.selected_image_index]['name'] = fileList.name;
        existingObvImageData.data[observationImages?.selected_image_index]['lastModified'] = fileList.lastModified;

        setObservationImages(existingObvImageData);
    }
    return (
        <>
            <div className="replace-image_wrapper position-absolute rounded-circle bg-white d-flex justify-content-center align-items-center">
                <Input
                    type="file"
                    name="file"
                    id="UploadFile1"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => handleUpdateImage(e)}
                    className="position-absolute w-100 h-100 opacity-0 p-0"
                />
                <Icon icon="ion:sync-outline" />
            </div>
        </>
    )
}
export default ObservationUpdateUploadedImages;