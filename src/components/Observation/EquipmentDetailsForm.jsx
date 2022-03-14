import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap"
import {Tabs} from "../../helpers/observation";
import {useEffect, useState ,useRef} from "react";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";

import "../../assets/scss/component/observationEquipment.scss";
import EquipmentForm from '../Shared/EquipmentForm';
import useObservations from "../../hooks/useObservations";


const EquipmentDetailsForm = (props) =>{
    const {toggleTab,handleInput,getCameraDetail,cameraDetails } = props;
    const { auth } = useAuth();

    const [updateSetting, setUpdateSetting] = useState();
    const [error, setError] = useState();

    // const handleInput = (e) => {
    //     let name = e.target.name,
    //         value = e.target.value;
    //         setUpdateSetting({
    //         ...updateSetting,
    //         [name]:value,
    //     })
    // }

    
    return (
        <>
        <Row>    
            {/* <Col sm="12">
                <FormGroup check>
                <Label check className="mb-4">
                    <Input
                        type="checkbox"
                        name="Pull data from my profile"
                        onClick={getCameraDetail}
                    />
                    Pull data from my profile
                </Label>
                </FormGroup>
            </Col> */}
            <EquipmentForm handleInput1={handleInput} updateSetting={cameraDetails} error={error}/>
            <Col md="12">
                <div className="border-line"></div>
                <FormGroup>
                    <h6>Elevation angle of your camera in degrees</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. 20"
                    />
                </FormGroup>
            </Col>
            <Col md={12}>

                {/* <div className="border-line"></div> */}
                <FormGroup>
                    <h6>Link to the video of this event</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. https://www.youtube.com/watch?v=PjZ2Y2nn000"
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <h6>Please share the story of your capture</h6>
                    <div className="border-line my-2"></div>
                    <Input
                        type="textarea"
                        name="textarea"
                        placeholder="We would love to hear more about your experience."
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <Button className="gray-outline-btn"  onClick={() =>toggleTab(Tabs.DateTimeLocation)}>Back</Button>
            </Col>
        </Row>
        </>
    )
}

export default EquipmentDetailsForm;