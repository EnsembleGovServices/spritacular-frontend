import {UncontrolledAlert, Button, FormFeedback, FormGroup, Input, Row,Col} from "reactstrap";

const EquipmentForm = ({handleInput1,updateSetting,error}) => {
    return(
        <>
         <Col md="12">
            <FormGroup>
                <label>Camera Type<span className="required">Required</span></label>
                <Input  
                type="text"
                name="camera_type"
                placeholder="Canon"
                // required
                value={updateSetting?.camera_type} 
                onChange={(e)=>handleInput1(e)}
                invalid={!!error?.data?.camera_type} />
                <FormFeedback>{error?.data?.camera_type}</FormFeedback>
            </FormGroup>
            <div className="border-line" />
            </Col>
            <Col md="12">
            <FormGroup>
                <h6>Lens Information</h6>
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Focal Length<span className="required">Required</span></label>
                <Input
                type="text"
                name="focal_length"
                value={updateSetting?.focal_length}
                placeholder="35 mm"
                // required
                onChange={(e)=>handleInput1(e)}
                invalid={!!error?.data?.focal_length}
                />
            <FormFeedback>{error?.data?.focal_length}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Aperture<span className="required">Required</span></label>
                <Input
                type="text"
                name="aperture"
                // required
                value={updateSetting?.aperture}
                placeholder="35 mm"
                invalid={!!error?.data?.aperture}
                onChange={(e)=>handleInput1(e)}
                />
                <FormFeedback>{error?.data?.aperture}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md="12">
            <div className="border-line" />
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
                onChange={(e)=>handleInput1(e)}
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
                onChange={(e)=>handleInput1(e)}
                />
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Frame Rate (frames per second)</label>
                <Input type="text" name="fps" value={updateSetting?.fps} placeholder="24" onChange={(e)=>handleInput1(e)}/>
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
                onChange={(e)=>handleInput1(e)}
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
                onChange={(e)=>handleInput1(e)}
                />
            </FormGroup>
            </Col>
            </>
    )
}
export default EquipmentForm;