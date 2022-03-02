import { useState } from "react";
import { Row, Col, FormGroup, Input, Button, Label, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Images from "../../static/images";
import { Icon } from "@iconify/react";
import ObservationUploadImg from "./ObservationUploadImg";
import useObservations from "../../hooks/useObservations";

const ObservationImages = () =>{
    const { observationImages } = useObservations();
    const [isMultiple, setIsMultiple] = useState(false);

    const ImagePreview = () =>{
        return(
            <div className="upload-multiple-observation">
                <div className="observation-image position-relative">
                    <Button className="bg-transparent text-black border-0 shadow-none p-0 position-absolute"><Icon icon="ci:close-big" /></Button>
                    <img
                        src={Images.ObservationImageOne}
                        alt="Bluejet"
                    />
                </div>
            </div>
        )
    }

    
    return (
        <>
            {!observationImages?.data ? (
                <Row>
                    <ObservationUploadImg imageFormat={true} maxLimit={true}/>
                </Row>
            ) : (
                <Row>
                    <Col sm={12}>
                        <FormGroup className="d-flex align-items-center position-relative">
                            <input
                                id="toggleMultiple"
                                type="checkbox"
                                className="custom-switch hidden"
                                onChange={(e)=> setIsMultiple(!isMultiple)}
                            />
                            <label
                                className="switchbox"
                                htmlFor="toggleMultiple"
                            />
                            <span>
                                Multiple Observations (limit to 3)
                            </span>
                        </FormGroup>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ObservationImages;