import {Alert,UncontrolledAlert, Button, Form, FormFeedback, FormGroup, Input, Label,Row,Col} from "reactstrap";
import axios from "../../api/axios";
import {useEffect, useState ,useRef} from "react";
import { useForm, Controller } from 'react-hook-form';
import {baseURL} from "../../helpers/url";


const CameraSetting = (props) => {
    const {cameraDetails, user, isDetailExist} = props;
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
    const myRef = useRef(null);
    const executeScroll = () => {
        console.log(myRef); 
        scrollToRef(myRef); 
    }
    const [updateSetting, setUpdateSetting] = useState({
        camera_type: '',
    });
    let method = 'post';
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    console.log(updateSetting);
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

    const handleCameraUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        
        console.log(updateSetting);
        if(isDetailExist){
            await axios.patch(baseURL.api+'/users/camera_setting/', updateSetting, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token?.access}`
                },
                withCredentials: true,
            }).then((success) => {
                setSuccess(success)
                executeScroll();
            }).catch((error) => {
                setError(error.response)
                executeScroll();
    
            })
        } else {
            await axios.post(baseURL.api+'/users/camera_setting/', updateSetting, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token?.access}`
                },
                withCredentials: true,
            }).then((success) => {
                setSuccess(success)
                executeScroll();
            }).catch((error) => {
                setError(error.response)
                executeScroll();
    
            })
        }
    }

    return(
        <>
            {success && (success?.status === 200 || success?.status === 201) &&
                <UncontrolledAlert variant="success" data-dismiss="alert" dismissible>
                    Camera settings updated successfully
                </UncontrolledAlert>
            }
                    <form onSubmit={handleCameraUpdate} ref={myRef}> 
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Camera Type</label>
                              <Input  
                                type="text"
                                name="camera_type"
                                placeholder="Canon"
                                // required
                                value={updateSetting?.camera_type} 
                                onChange={(e)=>handleInput(e)} 
                                invalid={!!error?.data?.camera_type} />
                              <FormFeedback>{error?.data?.camera_type}</FormFeedback>
                            </FormGroup>
                            <div className="border-line"/>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <h6>Lens Information</h6>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Focal Length</label>
                              <Input
                                type="text"
                                name="focal_length"
                                value={updateSetting?.focal_length}
                                placeholder="35 mm"
                                // required
                                onChange={(e)=>handleInput(e)}
                                invalid={!!error?.data?.focal_length}
                              />
                            <FormFeedback>{error?.data?.focal_length}</FormFeedback>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Aperture</label>
                              <Input
                                type="text"
                                name="aperture"
                                // required
                                value={updateSetting?.aperture}
                                placeholder="35 mm"
                                invalid={!!error?.data?.aperture}
                                onChange={(e)=>handleInput(e)}
                              />
                              <FormFeedback>{error?.data?.aperture}</FormFeedback>
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"/>
                            <FormGroup>
                              <h6>Camera Settings</h6>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>ISO</label>
                              <Input
                                type="text"
                                name="iso"
                                value={updateSetting?.iso}
                                placeholder="100"
                                onChange={(e)=>handleInput(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Shutter Speed (exposure time)</label>
                              <Input
                                type="text"
                                name="shutter_speed"
                                value={updateSetting?.shutter_speed}
                                placeholder="1/15"
                                onChange={(e)=>handleInput(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Frame Rate (frames per second)</label>
                              <Input type="text" name="fps" value={updateSetting?.fps} placeholder="24" onChange={(e)=>handleInput(e)}/>
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"></div>
                            <FormGroup>
                              <h6>How do you generally keep track of time?</h6>
                              <Input
                                type="text"
                                name="question_field_one"
                                value={updateSetting?.question_field_one}
                                placeholder="Camera Time"
                                onChange={(e)=>handleInput(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"></div>
                            <FormGroup>
                              <h6>
                                Do you use any special equipment attached to
                                your camera (such as a filter)?
                              </h6>
                              <Input
                                type="text"
                                name="question_field_two"
                                value={updateSetting?.question_field_two}
                                placeholder="Polarizing Filter"
                                onChange={(e)=>handleInput(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup className="profile-bottom-btn ">
                          <Button className="discard-btn">Discard</Button>
                          <Button className="save-btn" type="submit">Save Changes</Button>
                        </FormGroup>
                      </form>
        </>
    )
}
export default CameraSetting;