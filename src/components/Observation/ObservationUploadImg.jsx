import { FormGroup, Input,Label } from "reactstrap";
import useObservations from "../../hooks/useObservations";
import { Icon } from '@iconify/react';
import {useEffect, useState} from "react";
import {uploadImageDefaultState} from "../../helpers/observation";
import PropTypes from "prop-types";

const ObservationUploadImg = (props) =>{
    const {multiple, maxLimit, imageFormat, detectImage, mode}=props;
    const {setObservationImages, observationImages} = useObservations();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState();

    const handleUploadImage = (e) => {
        setError(null);
        const fileList = e.target.files;
        Array.from(fileList).forEach((item,id) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const baseImage = `data:image/png;base64,${base64String}`;
                const random = (Math.random() + 1).toString(36).substring(7) + (Math.random() + 1).toString(36).substring(20);
                const fileSize = (item.size / (1024*1024)).toFixed(2);
                const repeatCheck = images?.map((image, index) => {
                    return image?.lastModified === item?.lastModified && image?.name === item?.name;
                });
                const duplicate = repeatCheck.includes(true);

                const success = async (position) => {
                    let coordinates =  position.coords;
                    console.log('latitude', coordinates?.latitude)
                    await setUserLocation({
                        latitude: coordinates?.latitude,
                        longitude: coordinates?.longitude
                    })

                }

                const error = async (error) => {
                    await setUserLocation({})
                    console.warn(`ERROR(${error.code}): ${error.message}`)
                }


                if (images?.length <= (mode ? 1 : 2) && fileSize < 5 && !duplicate) {
                    navigator.geolocation.getCurrentPosition(success,error)

                    if (mode) {
                       return setImages([uploadImageDefaultState(random, baseImage, item, userLocation)])
                    } else {
                        setImages(prevState => [
                            ...prevState,
                            uploadImageDefaultState(random, baseImage, item, userLocation)
                        ])
                    }
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
                            count: 'You have reached the limit, delete some image, maximum upload allowed is 3',
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

            };
            reader.readAsDataURL(item)
        })
    };

    useEffect(() => {
        let images = (observationImages?.data) ? [...observationImages?.data] : [];
        observationImages?.data?.map((item, index) => {
            return item.latitude = userLocation?.latitude,
                item.longitude = userLocation?.longitude
        })
        setImages(images)
   },[detectImage, mode, userLocation])


    useEffect(()=> {
        if (images.length > 0) {
            setObservationImages({
                data: images,
                observation_count: images.length,
                selected_image_id: images?.[0]?.id,
                selected_image_index:0
            });
        }
    }, [images, setObservationImages, userLocation])

    return (
        <>
            <div className="upload-observation-main">
                <div className="upload-ob-inner">
                    <FormGroup>
                        <Label htmlFor="UploadFile">
                            <div className="upload-info">
                                <Icon icon="bx:image-alt" color="#737e96" width="42" height="42" />
                                <p>Drag and drop images or click to upload</p>
                                { maxLimit === true && 
                                    <span className="text-black">Max. Image Size: 5MB</span> 
                                }
                                {imageFormat === true &&
                                    <ul>
                                        <li>
                                            Common Image File Formats (JPEG or
                                            JPG, PNG)
                                        </li>
                                    </ul>
                                }

                            </div>
                        </Label>
                        <Input
                            type="file"
                            name="file"
                            id="UploadFile"
                            accept="image/jpg, image/jpeg, image/png"
                            multiple={multiple}
                            onChange={(e)=> handleUploadImage(e)}
                        />
                    </FormGroup>
                    {/* <div className="progress-bar_wrapper" style={{ "--uploadProgress": 65 + '%' }}>
                        <p className="image-progree_bar"><b>65%</b> uploading..</p>
                    </div> */}
                </div>
                {error?.count &&
                    <span className="text-danger d-block small my-1 d-inline-block">{error?.count} </span>
                }
                {error?.size &&
                    <span className="text-danger d-block small my-1 d-inline-block">{error?.size}</span>
                }
                {error?.duplicate &&
                    <span className="text-info d-block small my-1 d-inline-block">{error?.duplicate}</span>
                }
            </div>
        </>
    )
}

ObservationUploadImg.propTypes = {
    userLocation: PropTypes.object,
};


export default ObservationUploadImg;