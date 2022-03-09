import "../../assets/scss/component/uploadObservationImage.scss";
import { useState } from "react";
import { Row, Button } from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import useObservations from "../../hooks/useObservations";

const ObservationStepImages = (props) =>{
    const {proceedNext} = props;
    const [isMultiple] = useState(false);
    const { observationImages } = useObservations();

    return (
        <>
            <Row>
                <ObservationUploadImg imageFormat={true} maxLimit={true} multiple={isMultiple}/>
                <div className="mt-5">
                    <Button disabled={!observationImages?.data?.length} onClick={proceedNext}>Continue</Button>
                </div>
            </Row>
        </>
    )
}

export default ObservationStepImages;