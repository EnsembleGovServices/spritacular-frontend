import "../../assets/scss/component/uploadObservationImage.scss";
import { useState } from "react";
import { Row, Button, Col } from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import useObservations from "../../hooks/useObservations";
import ObservationUploadedImg from "./ObservationUploadedImg";

const ObservationImages = (props) =>{
    const {proceedNext, remove, detectImage, mode} = props;
    const [isMultiple] = useState(false);
    const { observationImages } = useObservations();

    return (
        <>
            <Row>
                <Col sm={observationImages?.data?.length ? 9 : 12} className="order-2 order-sm-1">
                    <ObservationUploadImg mode={mode} detectImage={detectImage} imageFormat={true} maxLimit={true} multiple={isMultiple}/>
                </Col>
                {observationImages?.data?.length && <Col sm={3}  className="order-1 order-sm-2 d-flex d-sm-block justify-content-end overflow-hidden">
                    <ObservationUploadedImg className="sm-selected_image" remove={remove} />
                </Col>}
            </Row>
            <Row>
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