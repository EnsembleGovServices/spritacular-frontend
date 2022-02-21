import React, { useRef, useState } from 'react';
import axios from '../../api/aixos';
import PropTypes from "prop-types";

const ImageUpload = () => {
    const [file, setFile] = useState('');
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgress] = useState('');
    const el = useRef();
    const handleChange = (e) => {
        setProgress('0')
        const file = e.target.files[0];
        console.log(file);
        setFile(file);
    }
    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        axios.post(process.env.REACT_APP_API_URL, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progressBar = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgress(progressBar);
            }
        }).then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                path: process.env.REACT_APP_API_URL + res.data.path
            })
        }).catch(err => console.log(err))}
    return (
        <div className="file-upload">
            <input type="file" ref={el} onChange={handleChange} />
            <div className="progressBar" style={{ width: progress }}>
                {progress}
            </div>
            <button onClick={uploadFile} className="upbutton">
                Upload
            </button>
            {/* displaying received image*/}
            {data.path &&
                <img src={data.path} alt="imageName" />
            }
        </div>
    );
}
ImageUpload.propTypes = {
    progress: PropTypes.number
};

export default ImageUpload;