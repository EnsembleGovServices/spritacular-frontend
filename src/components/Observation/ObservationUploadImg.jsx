import { Col, FormGroup,Button, Input,Label } from "reactstrap";
import useObservations from "../../hooks/useObservations";
import "../../assets/scss/component/uploadObservationImage.scss";
import { Icon } from '@iconify/react';
import {useEffect, useState} from "react";

const ObservationUploadImg = (props) =>{
    const {multiple, maxLimit, imageFormat}=props;
    const {setObservationImages} = useObservations();
    const [images, setImages] = useState([]);

    const handleUploadImage = (e) => {
        const fileList = e.target.files;
        const tempImages = [];
        const tempPreview = [];

        Array.from(fileList).forEach((item) => {
            tempImages.push(item);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const baseImage = `data:image/png;base64,${base64String}`;
                tempPreview.push(baseImage);
            };
            reader.readAsDataURL(item)
        })
        setTimeout(function () {
            setImages({
                data: tempImages,
                preview: tempPreview
            });
        }, 1000)
    };
    
    useEffect(()=> {
        setObservationImages(images);
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
            </div>
        </Col>
    )
}
export default ObservationUploadImg;