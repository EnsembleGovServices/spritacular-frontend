import React, { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import PropTypes from "prop-types";
import { baseURL } from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import { Button } from "reactstrap";
import { Icon } from '@iconify/react';
import LazyLoad from "./LazyLoad";

const ImageUpload = (props) => {
  const { setAuth } = useAuth();
  const { user, token, isProfilePopup, popupError, setPopupError } = props;
  const [file, setFile] = useState("");
  const [data, setData] = useState("");
  const [progress, setProgress] = useState("0");
  const [error, setError] = useState(null);

  // To store and validate file data on profile image upload.
  const handleChange = (e) => {
    // To remove all previous errors.
    setError('');
    isProfilePopup && setPopupError('');
    // To get file properties
    const file = e?.target?.files[0];
    setProgress('0');

    if (file) {
      setFile(file);
      // To get file size upto 2 decimals.
      const fileSize = (file.size / (1024 * 1024)).toFixed(2);
      // To verify file format is from listed(Array).
      const imgType = ["image/png", "image/jpeg", "image/jpg"]
      const isValidImage = imgType.includes(file.type);

      if (fileSize > 1) {
        if (isProfilePopup) {
          setPopupError((prev) => {
            return {
              ...prev,
              size: 'File exceeds the maximum allowed size of (1MB)',
            }
          })
        } else {
          setError((prev) => {
            return {
              ...prev,
              size: 'File exceeds the maximum allowed size of (1MB)',
            }
          });
        }
      }
      if (!isValidImage) {
        if (isProfilePopup) {
          setPopupError((prev) => {
            return {
              ...prev,
              invalidImage: 'Allowed formats are "JPEG or JPG, PNG" only.',
            }
          })
        } else {
          setError((prev) => {
            return {
              ...prev,
              invalidImage: 'Allowed formats are "JPEG or JPG, PNG" only.',
            }
          })
        }
      }
    } else {
      setError((prev) => {
        return {
          ...prev,
          noFile: 'Select any image file',
        }
      });
      process.env.NODE_ENV === "development" && console.log("Profile ImageUpload: No file selected");
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (file && !error && !popupError) {
      fileUpload().then(r => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, fileUpload]);


  const ProfilePreview = () => {
    return (
      <>
        <label className="form-label-border">
          <LazyLoad
            src={user?.profile_image}
            alt={user?.first_name}
          />
        </label>
        <Button className="edit-btn"><Icon icon="lucide:edit-2" /></Button>
        <input type="file" name="profile_image" onChange={handleChange} />
      </>
    )
  }
  const ProfileLoader = () => {
    return (
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
  const ProfileUploadText = () => {
    return (
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
                {progress > "1" && progress !== "100%" ? (
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
            )
          })}

        {error && <div className="mt-3">
          {error?.size &&
            <span className="text-danger d-block small my-1">{error?.size}</span>
          }
          {error?.invalidImage &&
            <span className="text-danger d-block small my-1">{error?.invalidImage}</span>
          }
        </div>}
      </>
    </>
  );
};
ImageUpload.propTypes = {
  progress: PropTypes.number,
};

export default ImageUpload;
