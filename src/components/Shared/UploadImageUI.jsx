import "../../assets/scss/component/initialUploadobservations.scss";
import {FormGroup, Input, Label} from "reactstrap";
import {Icon} from "@iconify/react/dist/iconify";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";

const UploadImageUI = (props) => {
    const {
        maxLimit,
        imageFormat,
        multiple,
        handleUploadImage,
        error,
        small,
        handleObvAdd,
        defaultUploadBox,
        blogUpload
    } = props;

    const {observationImages} = useObservations();
    const [replaceErrors, setReplaceErrors] = useState(observationImages?.error);


    useEffect(() => {
        setReplaceErrors(observationImages?.error);
    }, [observationImages?.error])

    return (
        <div className="position-relative">
            <div
                className={`upload-image_wrapper ${small ? "small-upload_box mb-5" : ''} ${blogUpload ? 'blog-upload-box' : ''}`}>
                <div className="upload-ob-inner">
                    <FormGroup>
                        <Label htmlFor="UploadFile">
                            <div className="upload-info">
                                <Icon icon="bx:image-alt" color="#737e96" width="42" height="42"/>
                                <p>{defaultUploadBox ? 'Upload your first observation' : 'Drag and drop images or click to upload'}</p>
                                {maxLimit && <span className="text-black">Max. Image Size: 5MB</span>}
                                {imageFormat &&
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
                            onChange={(e) => handleUploadImage(e)}
                        />
                    </FormGroup>
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
                {error?.invalidImage &&
                    <span className="text-danger d-block small my-1 d-inline-block">{error?.invalidImage}</span>
                }

                {replaceErrors?.invalidImage &&
                    <span className="text-danger d-block small my-1 d-inline-block">{replaceErrors?.invalidImage}</span>
                }

                {replaceErrors?.size &&
                    <span className="text-danger d-block small my-1 d-inline-block">{replaceErrors?.size}</span>
                }
            </div>
            {defaultUploadBox &&
                <div className={`${defaultUploadBox ? 'mark-center' : ''}`}>
                    <button onClick={(e) => handleObvAdd(e)}
                            className={`btn btn-secondary`}>
                        <Icon icon="heroicons-outline:upload" width="25" height="22"/>
                        Upload Observation
                    </button>
                </div>
            }
        </div>
    )
}
export default UploadImageUI;