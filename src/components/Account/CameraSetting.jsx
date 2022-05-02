import {UncontrolledAlert, Button, FormGroup, Row} from "reactstrap";
import axios from "../../api/axios";
import {useEffect, useState, useRef} from "react";
import {baseURL, cameraSettingFields} from "../../helpers/url";
import EquipmentForm from '../Shared/EquipmentForm'
import useAuth from "../../hooks/useAuth";

const CameraSetting = (props) => {
    const {setAuth, auth} = useAuth();
    const {cameraDetails, user, isDetailExist} = props;
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
    const myRef = useRef(null);
    const executeScroll = () => {
        scrollToRef(myRef);
    }
    const [updateSetting, setUpdateSetting] = useState(cameraSettingFields);
    const [updatedData, setUpdateData] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
            setUpdateSetting({
            ...updateSetting,
            [name]:value,
        })
    }



    useEffect(()=> {
        setUpdateSetting(cameraDetails)
    }, [cameraDetails])

    const resetToExistingCameraDetails = () => {
        setSuccess('');
        setError('');
      if (isDetailExist) {
          setUpdateSetting(cameraDetails);
          setSuccess({
              reset: 'Existing camera details restored successfully',
              status: 200
          })
      } else {
          setError({
              reset: 'Nothing to restore',
              status: 200
          });
      }

      executeScroll();
    }

    const handleCameraUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        if (isDetailExist) {
            await axios.patch(baseURL.api + '/users/camera_setting/', updateSetting, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token?.access}`
                },
                withCredentials: true,
            }).then((response) => {
                setUpdateData(response.data);
                setSuccess({
                    updated: 'Camera settings updated successfully',
                    status: response?.status
                })
                executeScroll();
            }).catch((error) => {
                setError({
                    data: error?.response.data,
                    status: error?.response?.status
                })
                executeScroll();
            })
        } else  {
            await axios.post(baseURL.api+'/users/camera_setting/', updateSetting, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token?.access}`
                },
                withCredentials: true,
            }).then((response) => {
                setSuccess({
                    status: 201,
                    data: response.data,
                    created: 'Camera settings added successfully.'
                })
                setAuth((prev)=> {
                    return {
                        user: {
                            ...prev,
                            camera: updatedData
                        }
                    }
                })
                executeScroll();
            }).catch((error) => {
                setError(error.response)
                executeScroll();
            })
            executeScroll();
        }
    }


    useEffect(()=> {
        setAuth((prev)=> {
            return {
                user: {
                    ...prev,
                    camera: updatedData
                }
            }
        })
    }, [updatedData])

    return(
        <>
            {success && (success?.status === 200 || success?.status === 201) &&
                <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true">
                    {success?.updated &&
                        success?.updated
                    }
                    {success?.created &&
                        success?.created
                    }
                    {success?.reset &&
                        success?.reset
                    }
                </UncontrolledAlert>
            }

            {error && error?.reset &&
                <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true">
                    {error?.reset &&
                        error?.reset
                    }
                </UncontrolledAlert>
            }
                    <form onSubmit={handleCameraUpdate} ref={myRef}>
                        <Row>
                         <EquipmentForm handleInput1={handleInput} updateSetting={updateSetting} error={error}/>
                     </Row>

                <FormGroup className="profile-bottom-btn ">
                    <Button className="discard-btn" type="button" onClick={resetToExistingCameraDetails}>Discard</Button>
                    <Button className="save-btn" type="submit" disabled={!(updateSetting.aperture && updateSetting.focal_length && updateSetting.camera_type)}>Save Changes</Button>
                </FormGroup>
            </form>
        </>
    )
}
export default CameraSetting;