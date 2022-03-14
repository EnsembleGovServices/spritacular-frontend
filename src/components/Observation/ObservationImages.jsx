import "../../assets/scss/component/uploadObservationImage.scss";
import { useState } from "react";
import { Row, Button, Col } from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import useObservations from "../../hooks/useObservations";
import ObservationUploadedImg from "./ObservationUploadedImg";

const ObservationImages = (props) =>{
    const {proceedNext} = props;
    const [isMultiple] = useState(false);
    const { observationImages } = useObservations();

    return (
        <>
            <Row>
                <Col sm={observationImages?.data?.length ? 10 : 12}>
                    <ObservationUploadImg imageFormat={true} maxLimit={true} multiple={isMultiple}/>
                </Col>
                {observationImages?.data?.length && <Col sm={2}>
                    <ObservationUploadedImg />
                </Col>}
                
                <Col sm={12}>
                    <div className="mt-5">
                        <Button disabled={!observationImages?.data?.length} onClick={proceedNext}>Continue</Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ObservationImages;