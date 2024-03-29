import { Row, Col, FormGroup, Input, Button } from "reactstrap"
import {Tabs} from "../../helpers/observation";

import "../../assets/scss/component/observationEquipment.scss";
import EquipmentForm from '../Shared/EquipmentForm';
import useObservations from "../../hooks/useObservations";

const EquipmentDetailsForm = (props) =>{
    const {toggleTab,handleInput,handleOtherCamera,cameraDetails, error, step, isSwitchOn, handleSubmitConfirmation } = props;
    const {
        observationData
    } = useObservations();
    return (
        <>
        <Row>
            <EquipmentForm step={step} handleInput1={handleInput} updateSetting={cameraDetails} error={error} isSwitchOn={isSwitchOn}/>

            <Col md="12">
                <div className="border-line"/>
                <FormGroup>
                    <h6>Do you know the elevation angle of your camera [°]?</h6>
                    <Input
                    type="number"
                    name="elevation_angle"
                    value={observationData?.elevation_angle ?? ''}
                    placeholder="e.g. 20"
                    onChange={(e)=>handleOtherCamera(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>20</span>
                </FormGroup>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <h6>Link to the video of this event</h6>
                    <Input
                    type="url"
                    name="video_url"
                    value={observationData?.video_url ?? ''}
                    onChange={(e)=>handleOtherCamera(e)}
                    placeholder="e.g. https://www.youtube.com/watch?v=PjZ2Y2nn000"
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>https://www.youtube.com/watch?v=PjZ2Y2nn000</span>
                </FormGroup>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <h6>Please share the story of your capture</h6>
                    <div className="border-line my-2"/>
                    <Input
                        type="textarea"
                        name="story"
                        value={observationData?.story ?? ''}
                        onChange={(e)=>handleOtherCamera(e)}
                        placeholder="We would love to hear more about your experience."
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <Button className="gray-outline-btn me-2"  onClick={() =>toggleTab(Tabs.DateTimeLocation)}>Back</Button>
                <Button type="button" onClick={(e) => handleSubmitConfirmation(e)} disabled={(!(cameraDetails?.camera_type && cameraDetails?.focal_length && cameraDetails?.aperture)) }>Submit</Button>
            </Col>
        </Row>
        </>
    )
}

export default EquipmentDetailsForm;