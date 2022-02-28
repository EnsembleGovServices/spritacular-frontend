import { FormGroup, Input, Button } from "reactstrap";

const EquipmentDetails = () => {
    return(
        <>
            <ul>
                <li>
                    <h6>Camera Type</h6>
                    <p>Canon</p>
                </li>
                <li>
                    <h6>Focal Length</h6>
                    <p>35 mm</p>
                </li>
                <li>
                    <h6>Aperture</h6>
                    <p>f/1.4</p>
                </li>
                <li>
                    <h6>ISO</h6>
                    <p>100</p>
                </li>
                <li>
                    <h6>Shutter Speed</h6>
                    <p>1/15 sec</p>
                </li>
                <li>
                    <h6>Frame Rate</h6>
                    <p>24</p>
                </li>
                <li>
                    <h6>How do you generally keep track of time?</h6>
                    <p>Camera Type</p>
                </li>
                <li>
                    <h6>Do you use any special equipment attached to your camera (such as a filter)?</h6>
                    <p>Polarizing Filter</p>
                </li>
            </ul>
            <FormGroup>
                <h6>Elevation angle of your camera in degrees</h6>
                <Input
                type="text"
                name="name"
                placeholder="e.g. 20"
                />
            </FormGroup>
            <FormGroup>
                <h6>Link to the video of this event</h6>
                <Input
                type="text"
                name="name"
                placeholder="e.g. https://www.youtube.com/watch?v=PjZ2Y2nn000"
                />
            </FormGroup>
            <FormGroup>
                <h6>Please share the story of your capture</h6>
                <Input
                    type="textarea"
                    name="textarea"
                    placeholder="We would love to hear more about your experience."
                />
            </FormGroup>
            <Button>Back</Button>
        </>
    )
}

export default EquipmentDetails;