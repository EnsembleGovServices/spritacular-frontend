import React, {useCallback, useEffect, useState} from "react";
import axios from "../../api/axios";
import PropTypes from "prop-types";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import { Button } from "reactstrap";
import { Icon } from '@iconify/react';

const ImageUpload = (props) => {
  const { setAuth } = useAuth();
  const { user, token } = props;
  const [file, setFile] = useState("");
  const [data, setData] = useState("");
  const [progress, setProgress] = useState("0");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setProgress('0')
  };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fileUpload = useCallback(async () => {
        setError('');
        const formData = new FormData();
        formData.append("profile_image", file);
        await axios.patch(baseURL.api + "/users/user_profile/" + user?.id + "/", formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            onUploadProgress: (ProgressEvent) => {
                let progressBar = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%";
                setProgress(progressBar);
            },
        }).then((response) => {
            setData(response.data);
            setAuth(prev => {
                return {
                    ...prev,
                    user: {
                        ...user,
                        profile_image: response?.data?.profile_image.replace(baseURL.remote, ""),
                    }
                }
            });
        }).catch((error) => {
            setError(error.response);
        })
    }, [file]);

    useEffect(() => {
        if (file) {
            fileUpload().then(r => r);
        }
    }, [file, fileUpload]);

    const ProfilePreview = () =>{
      return(
        <>
          <label className="form-label-border">
            <img
              className="img-fluid"
              src={data ? data?.profile_image : baseURL.remote+user?.profile_image}
              alt={user?.first_name}
            />
          </label>
          <Button className="edit-btn"><Icon icon="lucide:edit-2" /></Button>
          <input type="file" name="profile_image" onChange={handleChange} />
        </>
      )
    }
    const ProfileLoader = () =>{
      return(
        <>
          <div className='progressBar' style={{ "--percentage": progress }}>
              <div className="wrapper">
                <b>{progress}</b>
                <span>uploading..</span>
              </div>
          </div>
        </>
      )
    }
    const ProfileUploadText = () =>{
      return(
        <>
          <div className='form-label'>
              <div className="wrapper">
                <span>Please upload your image</span>
                <input type="file" name="profile_image" onChange={handleChange} />
              </div>
          </div>
        </>
      )
    }
    
  return (
    <>
      <div className="user-profile-upload">
        {data ? (
          <>
            {progress > "1" && !error && progress !== "100%" ? (
              <ProfileLoader />
            ) : (
              <ProfilePreview />
            )}
          </>
        ) : (
          <>
          {user?.profile_image ? (
            <>
            {progress > "1"  && progress !== "100%" ? (
              <ProfileLoader />
            ) : (
              <ProfilePreview />
            )}
          </>
          ) : (
            <>
            {progress > "1" && error?.status !== 400 ? (
              < ProfileLoader />
            ) : (
              <ProfileUploadText />
            )

            }
            </>
          )}
            
          </>
        )}
      </div>

      <>
        {error?.data &&
          error.data.profile_image.map((error, i) => {
            return (
              <span key={i} className="text-danger small">
                {error}
              </span>
            );
          })}
      </>
    </>
  );
};
ImageUpload.propTypes = {
  progress: PropTypes.number,
};

export default ImageUpload;
