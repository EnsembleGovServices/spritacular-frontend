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
            console.group('Upload Response')
            console.log(response);
            console.groupEnd();
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
            console.group('Upload Error')
            console.log(error);
            console.groupEnd();
            setError(error.response);
        })
    });

    useEffect(() => {
        if (file) {
            fileUpload().then(r => r);
        }
    }, [file])
    
  return (
    <>
      <div className="user-profile-upload">
        {data ? (
          <>
            {progress > "1" && progress !== "100%" ? (
              <div className={progress > "1" ? 'progressBar' : 'form-label'} style={{ "--percentage": progress }}>
                  <div className="wrapper">
                          <>
                              <b>{progress}</b>
                              <span>uploading..</span>
                          </>
                      <input type="file" name="profile_image" onChange={handleChange} />
                  </div>
              </div>
            ) : (
              <>
                <label className="form-label-border">
                  <img
                    className="img-fluid"
                    src={data?.profile_image}
                    alt={user?.first_name}
                  />
                </label>
                <Button className="edit-btn"><Icon icon="lucide:edit-2" /></Button>
                <input type="file" name="profile_image" onChange={handleChange} />
              </>
            )}
          </>
        ) : (
          <>
            <div className={progress > "1" ? 'progressBar' : 'form-label'} style={{ "--percentage": progress }}>
                <div className="wrapper">
                    {progress > "1" ? (
                        <>
                            <b>{progress}</b>
                            <span>uploading..</span>
                        </>
                    ) : (
                        <span>Please upload your image</span>
                    )}
                    <input type="file" name="profile_image" onChange={handleChange} />
                </div>
            </div>
          </>
        )}
      </div>

      <div>
        {error?.data &&
          error.data.profile_image.map((error, i) => {
            return (
              <span key={i} className="text-danger small">
                {error}
              </span>
            );
          })}
      </div>
    </>
  );
};
ImageUpload.propTypes = {
  progress: PropTypes.number,
};

export default ImageUpload;
