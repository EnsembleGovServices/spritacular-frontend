import "../../assets/scss/component/initialUploadobservations.scss";
import "../../assets/scss/component/uploadFeatureBlog.scss";
import UploadImageUI from "../Shared/UploadImageUI";
import { useEffect, useLayoutEffect, useState } from "react";
import { Icon } from '@iconify/react';
import BlurImage from "../Common/BlurImage";
import { FormGroup, Label } from "reactstrap";

const UploadFeaturedImage = (props) => {
    const { setData, thumb } = props;
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(null);

    // Validates and stores image data
    const handleFileInput = (e) => {
        // To remove all previous errors.
        setError('');
        setReset(false);
        setPreview(null)
        // To get file properties
        const file = e?.target?.files[0];

        if (file) {
            setFile(file);
            // To get file size upto 2 decimals.
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            // To verify file format is from listed(Array).
            const imgType = ["image/png", "image/jpeg", "image/jpg"]
            const isValidImage = imgType.includes(file.type);

            if (fileSize > 5) {
                setError((prev) => {
                    return {
                        ...prev,
                        size: 'File exceeds the maximum allowed size of (1MB)',
                    }
                });
            }
            if (!isValidImage) {
                setError((prev) => {
                    return {
                        ...prev,
                        invalidImage: 'Allowed formats are "JPEG or JPG, PNG" only.',
                    }
                })
            }
        } else {
            setError((prev) => {
                return {
                    ...prev,
                    noFile: 'Select any image file',
                }
            });
            console.log("FeaturedImage: No file selected");
        }
    }

    // Converts image data to preview.
    const previewImage = () => {
        setError('');
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            const baseImage = `data:image/png;base64,${base64String}`;
            setPreview(baseImage);
        }
        reader.readAsDataURL(file);
    }

    // Reset to defaults
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

    // To show image preview on re-browse.
    useLayoutEffect(() => {
        if (file && !reset && !error) {
            previewImage();
        }
    }, [file, preview])

    // To trigger parent function and store image data.
    useEffect(() => {
        if (!reset && !error) {
            setData((prev) => {
                return {
                    ...prev,
                    thumbnail_image: file
                }
            })
        }
    }, [file])

    // To extract filename from url
    const getFileName = (url) => {
        return url.split(/[#?]/)[0].split("/").pop().trim();
    };
    // To verify file
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        if (thumb && !error) {
            return fetch(thumb)
                .then(async (response) => {
                    const contentType = response.headers.get("content-type");
                    const blob = await response
                        .blob()
                        .catch((error) => process.env.NODE_ENV === "development" && console.log("blob error", error));
                    let fileName = getFileName(thumb);
                    const file = new File([blob], fileName, { contentType });
                    const image = await toBase64(file).catch((error) =>
                        process.env.NODE_ENV === "development" && console.log("base64 Error", error)
                    );
                    setTimeout(() => {
                        setData((prev) => {
                            return {
                                ...prev,
                                thumbnail_image: file
                            }
                        })
                        setFile(file)
                        setPreview(image);
                    }, 500)
                    return file;
                })
                .catch((error) => process.env.NODE_ENV === "development" && console.log(`File converting delayed`));
        }
    }, [thumb])

    return (
        <FormGroup>
            <Label for="title">
                Upload Thumbnail
            </Label>
            <div className="position-relative overflow-hidden">
                <UploadImageUI blogUpload={true} handleUploadImage={handleFileInput} error={error} />
                {preview &&
                    <div className={'img_wrapper position-absolute w-100 left-0 right-0 top-0 bottom-0'}>
                        <button className="remove-btn" onClick={(e) => removePreviewAndClearImageData(e)}>
                            <Icon icon="clarity:window-close-line" width={20} height={20} />
                        </button>
                        <div className={'img-preview_wrapper'}>
                            <BlurImage image={preview} preview={preview} />
                        </div>
                    </div>
                }
            </div>
        </FormGroup>

    )
}
export default UploadFeaturedImage;