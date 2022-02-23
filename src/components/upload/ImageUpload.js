import React, { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import PropTypes from "prop-types";

const ImageUpload = (props) => {
  const { user, token } = props;
  const [file, setFile] = useState("");
  const [data, setData] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setProgress("0");
    const file = e.target.files[0];
    setFile(file);
    uploadFile();
  };
  const uploadFile = useCallback(() => {
    const formData = new FormData();
    formData.append("profile_image", file);
    axios
      .patch(
        process.env.REACT_APP_API_URL + "/users/user_profile/" + user?.id + "/",
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            let progressBar =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%";
            setProgress(progressBar);
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, [file, token, user?.id]);

  useEffect(() => {
    uploadFile();
  }, [uploadFile]);

  return (
    <>
      <div className="user-profile-upload">
        {data.profile_image !== null ? (
          <>
            <label className="form-label-border">
              <img
                className="img-fluid"
                src={data?.profile_image}
                alt={user?.first_name}
              />
            </label>
            <input type="file" name="profile_image" onChange={handleChange} />
          </>
        ) : (
          <>
            <label className="form-label">
              <span>Please upload your image</span>
              <input type="file" name="profile_image" onChange={handleChange} />
            </label>
            <div className="progressBar" style={{ ["--percentage"]: progress }}>
              <span className="progress">
                <b>{progress}</b>
                uploading..
              </span>
            </div>
            {/* <div className="progressBar" style={{ width: progress }}>
              <span className="progress">{progress}50%</span>
              <label className="form-label">
                <span>Please upload your image</span>
              </label>
              <input type="file" name="profile_image" onChange={handleChange} />
            </div> */}
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
