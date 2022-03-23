import { FormGroup, Input,Label } from "reactstrap";
import useObservations from "../../hooks/useObservations";
import "../../assets/scss/component/uploadObservationImage.scss";
import { Icon } from '@iconify/react';
import {useEffect, useState} from "react";

const ObservationUploadImg = (props) =>{
    const {multiple, maxLimit, imageFormat, detectImage}=props;
    const {setObservationImages, observationImages} = useObservations();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

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
                    return image?.lastModified === item?.lastModified;
                });

                const duplicate = repeatCheck.includes(true);
                
                if (images?.length < 3 && fileSize < 5 && !duplicate) {
                    setImages(prevState => [
                        ...prevState, {
                            'id' : random,
                            'image' : baseImage,
                            'lastModified': item?.lastModified,
                            'item': item,
                            'latitude': 18.5204,
                            'longitude': 73.8567,
                            'location': 'Maharashtra, India',
                            'country_code': 'IN',
                            'obs_date': null,
                            'obs_time': null,
                            'timezone': 'Africa/Abidjan',
                            'azimuth': 'N',
                            'time_accuracy':'',
                            'is_precise_azimuth':0,
                            'category_map': {
                                'category': [],
                                'is_other': false,
                                'other_value': ''
                            }
                        }
                    ])
                }
                if (images?.length > 3) {
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
        let images = (observationImages?.data) ? [...observationImages?.data] : []
        setImages(images)
   },[detectImage])


    useEffect(()=> {
        if (images.length > 0) {
            setObservationImages({
                data: images,
                observation_count: images.length,
                selected_image_id: images?.[0]?.id,
                selected_image_index:0
            });
        }
    }, [images, setObservationImages])

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
export default ObservationUploadImg;