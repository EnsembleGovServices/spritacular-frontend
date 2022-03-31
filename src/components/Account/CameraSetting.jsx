import {UncontrolledAlert, Button, FormGroup, Row} from "reactstrap";
import axios from "../../api/axios";
import {useEffect, useState ,useRef} from "react";
import {baseURL, cameraSettingFields} from "../../helpers/url";
import EquipmentForm from '../Shared/EquipmentForm'


const CameraSetting = (props) => {
    const {cameraDetails, user, isDetailExist} = props;
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
    const myRef = useRef(null);
    const executeScroll = () => {
        scrollToRef(myRef);
    }
    const [updateSetting, setUpdateSetting] = useState(cameraSettingFields);
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

    const handleCameraUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        
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
            sessionStorage.removeItem('camera');
            await axios.post(baseURL.api+'/users/camera_setting/', updateSetting, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token?.access}`
                },
                withCredentials: true,
            }).then((success) => {
                setSuccess(success)
                sessionStorage.setItem('camera', true);
                executeScroll();
            }).catch((error) => {
                sessionStorage.removeItem('camera');
                setError(error.response)
                executeScroll();
    
            })
        }
    }

    return(
        <>
            {success && (success?.status === 200 || success?.status === 201) &&
                <UncontrolledAlert variant="success" data-dismiss="alert" dismissible="true">
                    Camera settings updated successfully
                </UncontrolledAlert>
            }
                    <form onSubmit={handleCameraUpdate} ref={myRef}> 
                        <Row>
                         <EquipmentForm handleInput1={handleInput} updateSetting={updateSetting} error={error}/>
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