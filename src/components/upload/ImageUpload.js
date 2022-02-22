import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from '../../api/axios';
import PropTypes from "prop-types";
import {baseURL} from "../../Layouts/Master";

const ImageUpload = (props) => {
    const {user, token} = props;
    const [file, setFile] = useState('');
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState('');
    const [error, setError] = useState(null);
    const profile_image_upload = useRef();
    const handleChange = (e) => {
        setProgress('0')
        const file = e.target.files[0];
        console.log(file);
        setFile(file);
        uploadFile();
    }
    const uploadFile = useCallback(() => {
        const formData = new FormData();
        formData.append('profile_image', file);
        axios.patch(process.env.REACT_APP_API_URL+'/users/user_profile/'+user?.id+'/', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progressBar = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgress(progressBar);
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
        }).then(res => {
            setData(res.data)
            setError(null)
            if (process.env.NODE_ENV === 'development') {
                console.log(res);
            }
        }).catch(err => {
            setError(err.response)
        })}, [file, token, user?.id])

    useEffect(()=> {
        uploadFile();
    },  [uploadFile])

    return (
        <>
            <div className="user-profile-upload">
                <div>
                    <input type="file" name="profile_image" ref={profile_image_upload} onChange={handleChange} />
                    <div className="progressBar" style={{ width: progress }}>
                        {progress}
                    </div>
                </div>
                {data ? (
                    <img className="img-fluid" src={data.profile_image} alt={user?.first_name} />
                ) : (
                    <img className="img-fluid" src={baseURL.base+user?.profile_image} alt={user?.first_name} />
                )}
            </div>
            <div>
                {error?.data &&
                    error.data.profile_image.map((error, i)=> {
                        return(
                            <span key={i} className="text-danger small">{error}</span>
                        )
                    })
                }
            </div>
        </>
    );
}
ImageUpload.propTypes = {
    progress: PropTypes.number
};

export default ImageUpload;