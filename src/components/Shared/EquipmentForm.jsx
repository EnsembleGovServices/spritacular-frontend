import {FormGroup, Input, Col} from "reactstrap";

const EquipmentForm = (props) => {
    const {handleInput1, updateSetting, error} = props;
    return (
        <>
            <Col md="12">
                <FormGroup>
                    <label>Camera Type<span className="required">Required</span></label>
                    <Input
                        type="text"
                        name="camera_type"
                        placeholder="Canon"
                        // required
                        maxLength={30}
                        value={updateSetting?.camera_type}
                        onChange={(e) => handleInput1(e)}/>
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>Canon</span>
                    {error?.data?.camera_type &&
                        <span className="text-danger small">{error?.data?.camera_type}</span>
                    }
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
                    <label>Focal Length [mm]<span className="required">Required</span></label>
                    <Input
                        type="number"
                        maxLength={10}
                        name="focal_length"
                        value={updateSetting?.focal_length}
                        placeholder="35"
                        // required
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>35</span>
                    {error?.data?.focal_length &&
                        <span className="text-danger small">{error?.data?.focal_length}</span>
                    }
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <label>Aperture<span className="required">Required</span></label>
                    <Input
                        type="number"
                        name="aperture"
                        // required
                        value={updateSetting?.aperture ? updateSetting?.aperture : updateSetting?.aperture === null ?? ''}
                        placeholder="1.4"
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>1.4</span>
                    {error?.data?.aperture &&
                        <span className="text-danger small">{error?.data?.aperture}</span>
                    }
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
                        type="number"
                        name="iso"
                        value={updateSetting?.iso}
                        placeholder="100"
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>100</span>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <label>Shutter Speed [sec.]</label>
                    <Input
                        type="text"
                        name="shutter_speed"
                        value={updateSetting?.shutter_speed}
                        placeholder="1/15"
                        maxLength={10}
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>1/15</span>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <label>Frame Rate [fps]</label>
                    <Input type="number" name="fps" value={updateSetting?.fps} placeholder="24"
                           onChange={(e) => handleInput1(e)}/>
                </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"/>
                <FormGroup>
                    <h6>How do you generally keep track of time?</h6>
                    <Input
                        type="text"
                        name="question_field_one"
                        value={updateSetting?.question_field_one}
                        placeholder="Camera Time"
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>Camera Time</span>
                </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"/>
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
                        onChange={(e) => handleInput1(e)}
                    />
                    <span className="d-block mt-1 opacity-75 ex-text"><b className="me-1">Example:</b>Polarizing Filter</span>
                </FormGroup>
            </Col>
        </>
    )
}
export default EquipmentForm;