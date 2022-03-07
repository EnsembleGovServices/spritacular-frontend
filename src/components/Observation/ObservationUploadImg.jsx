import { Col, FormGroup, Input,Label } from "reactstrap";
import useObservations from "../../hooks/useObservations";
import "../../assets/scss/component/uploadObservationImage.scss";
import { Icon } from '@iconify/react';
import {useEffect, useState} from "react";
import images from "../../static/images";

const ObservationUploadImg = (props) =>{
    const {multiple, maxLimit, imageFormat}=props;
    const {setObservationImages} = useObservations();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);


    const handleUploadImage = (e) => {
        const fileList = e.target.files;
        Array.from(fileList).forEach((item) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const baseImage = `data:image/png;base64,${base64String}`;
                const random = (Math.random() + 1).toString(36).substring(7) + (Math.random() + 1).toString(36).substring(20);

                images?.map((image, index) => {
                    if (image?.name === item?.name) {
                        setError((prev) => {
                            return {
                                ...prev,
                                duplicate: 'Image has been already added',
                            }
                        })
                    }
                    return true;
                });


                if (images?.length < 3) {
                    setImages(prevState => [
                        ...prevState, {
                            'id' : random,
                            'name' : item?.name,
                            'image' : baseImage,
                            'original': item
                        }
                    ])
                } else {
                    setError((prev) => {
                        return {
                            ...prev,
                            message: 'You have reached the limit, delete image(s) to add new again.',
                        }
                    })
                }

            };
            reader.readAsDataURL(item)
        })
    };

    useEffect(()=> {
        setObservationImages({
            images: images,
            selected: images?.[0]?.id
        });
    }, [images, setObservationImages])


    return (
        <Col sm="12">
            <div className="upload-observation-main">
                <div className="upload-ob-inner">
                    <FormGroup>
                        <Label htmlFor="UploadFile">
                            <div className="upload-info">
                                <Icon icon="bx:image-alt" color="#737e96" width="42" height="42"/>
                                <p>Drag and drop images or click to upload</p>
                                {
                                    maxLimit === true ? <span className="text-black">Max. Image Size: 5MB</span> : ''
                                }
                                {
                                    imageFormat === true ? (
                                        <ul>
                                            <li>
                                                Common Image File Formats (JPEG or
                                                JPG, PNG, TIFF)
                                            </li>
                                        </ul>
                                    ) : ''
                                }

                            </div>
                        </Label>
                        <Input
                            type="file"
                            name="file"
                            id="UploadFile"
                            accept="image/jpg, image/tiff, image/jpeg, image/png"
                            multiple={multiple}
                            onChange={(e)=> handleUploadImage(e)}
                        />
                    </FormGroup>
                </div>
                {error?.message &&
                    <>
                        <span className="text-danger small mt-2 d-inline-block">{error?.message}</span>
                    </>
                }
                {error?.duplicate &&
                    <>
                        <span className="text-danger small mt-2 d-inline-block">{error?.duplicate}</span>
                    </>
                }
            </div>
        </Col>
    )
}
export default ObservationUploadImg;