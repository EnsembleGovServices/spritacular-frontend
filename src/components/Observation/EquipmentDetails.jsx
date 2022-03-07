import { Row, Col, FormGroup,FormFeedback, Label, Input, Button } from "reactstrap"
import {Tabs} from "../../helpers/observation";
import {useEffect, useState ,useRef} from "react";

import "../../assets/scss/component/observationEquipment.scss";
import EquipmentForm from '../Shared/EquipmentForm'

const EquipmentDetails = (props) =>{
    const {toggleTab,handleInput } = props;
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

    const getCameraDetail = () => {

    }
    return (
        <>
        <Row>
        <Col sm="12">
                <FormGroup className="d-flex align-items-center position-relative">
                    <div className="custom-switch mb-5">
                        <input
                            id="checkbox0"
                            type="checkbox"
                            className="hidden"
                        />
                        <label
                            className="switchbox"
                            htmlFor="checkbox0"
                        />
                        <span>
                            I used the same camera, camera settings, and lens listed in my profile
                        </span>
                    </div>
                </FormGroup>
            </Col>
            <Col sm="12">
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
            </Col>
            <EquipmentForm handleInput1={handleInput} updateSetting={updateSetting} error={error}/>
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

export default EquipmentDetails;