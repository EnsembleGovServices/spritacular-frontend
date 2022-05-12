import "../../assets/scss/component/initialUploadobservations.scss";
import "../../assets/scss/component/uploadFeatureBlog.scss";
import UploadImageUI from "../Shared/UploadImageUI";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Icon} from '@iconify/react';
import BlurImage from "../Common/BlurImage";
import {FormGroup, Label} from "reactstrap";

const UploadFeaturedImage = (props) => {
    const {setData, uploadProgress, error} = props;
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [reset, setReset] = useState(false);
    // const progressBar = useRef(null);

    const handleFileInput = (e) => {
        setReset(false);
        setPreview(null)
        setFile(e.target.files[0]);
    }
    const previewImage = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            const baseImage = `data:image/png;base64,${base64String}`;
            setPreview(baseImage);
        }
        reader.readAsDataURL(file);
    }

    const removePreviewAndClearImageData = (e) => {
        setReset(true);
        e.preventDefault();
        setPreview(null);
        setFile(null);
        setData((prev) => {
            return {
                ...prev,
                thumbnail_image: null
            }
        })
    }

    useLayoutEffect(() => {
        if (file && !reset) {
            previewImage();
        }
    }, [file, preview])

    useEffect(() => {
        if (!reset) {
            setData((prev) => {
                return {
                    ...prev,
                    thumbnail_image: file
                }
            })
        }
    }, [file])

    // useEffect(() => {
    //     if (uploadProgress === "100%") {
    //         progressBar.current.classList.add('fade-out');
    //         setTimeout(function () {
    //             progressBar.current.classList.add('fade-out');
    //         }, 500);
    //         setTimeout(function () {
    //             progressBar.current.remove();
    //         }, 1200);
    //     }
    // }, [uploadProgress])

    return (
        <FormGroup>
            <Label for="title">
                Upload Thumbnail
            </Label>
            <div className="position-relative overflow-hidden">
                <UploadImageUI blogUpload={true} handleUploadImage={handleFileInput}/>
                {preview &&
                    <div className={'img_wrapper position-absolute w-100 left-0 right-0 top-0 bottom-0'}>
                        <button className="remove-btn" onClick={(e) => removePreviewAndClearImageData(e)}>
                            <Icon icon="clarity:window-close-line" width={20} height={20}/>
                        </button>
                        <div className={'img-preview_wrapper'}>
                            <BlurImage image={preview} preview={preview}/>
                        </div>
                    </div>
                }
                {/*{uploadProgress > "1%" &&*/}
                {/*    <div className="progressbar" ref={progressBar} style={{width: uploadProgress}}>*/}
                {/*        {`${uploadProgress}`}*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </FormGroup>

    )
}
export default UploadFeaturedImage;