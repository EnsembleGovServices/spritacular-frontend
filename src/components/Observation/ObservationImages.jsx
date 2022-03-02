import { useState } from "react";
import { Row, Col, FormGroup, Input, Button, Label, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Images from "../../static/images";
import { Icon } from "@iconify/react";
import { MultiImageTabs } from "../../helpers/observation";
import "../../assets/scss/component/uploadObservationImage.scss";
import ObservationUploadImg from "./ObservationUploadImg";
import useObservations from "../../hooks/useObservations";

const ObservationImages = () =>{
    const [activeTab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);
    const [isMultiple, setIsMultiple] = useState(false);
    const [proceedNext, setProceedNext] = useState(false);
    const { observationImages } = useObservations();

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };
    const handleProceedNext = () => {
      setProceedNext(!proceedNext);
    }

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
            {/* {!proceedNext &&
                <ObservationUploadImg imageFormat={true} maxLimit={true} multiple={isMultiple} proceedNext={()=> handleProceedNext()}/>
            }

            {proceedNext && */}
            {!observationImages?.data ? (
                <Row>
                    <ObservationUploadImg imageFormat={true} maxLimit={true}/>
                </Row>
            ) : (
                <Row>
                    <Col sm={12}>
                        <FormGroup className="d-flex align-items-center position-relative">
                            <div className="custom-switch">
                                <input
                                    id="toggleMultiple"
                                    type="checkbox"
                                    className="hidden"
                                    onChange={(e)=> setIsMultiple(!isMultiple)}
                                />
                                <label
                                    className="switchbox"
                                    htmlFor="toggleMultiple"
                                />
                                <span>
                                    Multiple Observations (limit to 3)
                                </span>
                            </div>
                        </FormGroup>
                    </Col>
                    {
                        isMultiple ? (
                            <Col sm={12}>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink 
                                            className={activeTab === MultiImageTabs.MultipleImages ? 'active' : ''}
                                            onClick={() => {
                                                toggleTab(MultiImageTabs.MultipleImages);
                                            }}
                                        >
                                            <Icon icon="fluent:square-multiple-20-regular" color="black" width={24} className="me-3" />
                                            Multiple images
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={activeTab === MultiImageTabs.ImageSequence ? 'active' : ''}
                                            onClick={() => {
                                                toggleTab(MultiImageTabs.ImageSequence);
                                            }}
                                        >
                                            <Icon icon="codicon:list-filter" color="black" width={24} className="me-3" />
                                            <div>
                                                Image Sequence
                                                <p className="mb-0">Images sequence extracted from a video</p>
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                        ):('')
                    
                    }
                    <Col sm={12}>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={MultiImageTabs.MultipleImages}>
                                <Row>
                                    {isMultiple ? (
                                        <Col sm={12}>
                                            <div className="small-upload_box mb-3">
                                                <ObservationUploadImg imageFormat={false} maxLimit={false} multiple={isMultiple} proceedNext={()=> handleProceedNext()}/>
                                            </div>
                                        </Col>
                                    ) : ('')}
                                    <Col sm={12}>
                                        <FormGroup className="mb-1">
                                            <p className="fw-bold">
                                                Please choose the appropriate category
                                                <p className="required">Required</p>
                                            </p>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12}>
                                        <ImagePreview />
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="sprite"
                                                        name="option1"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="sprite">
                                                        <img
                                                            src={Images.SpriteOb}
                                                            alt="Sprite"
                                                        />
                                                        Sprite
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="blue-jet"
                                                        name="BlueJet"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="blue-jet">
                                                        <img
                                                            src={Images.Bluejet}
                                                            alt="Bluejet"
                                                        />
                                                        Blue Jet
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="elve"
                                                        name="Elve"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="elve">
                                                        <img src={Images.Elev} alt="Elve" />
                                                        Elve
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="halo"
                                                        name="Halo"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="halo">
                                                        <img src={Images.Halo} alt=" Halo" />
                                                        Halo
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="gigantic-jet"
                                                        name="Gigantic Jet"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="gigantic-jet">
                                                        <img
                                                            src={Images.GiganticJet}
                                                            alt="Sprite"
                                                        />
                                                        Gigantic Jet
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <div className="checkbox-wrapper">
                                                <div className="inputGroup">
                                                    <input
                                                        id="secondary-jet"
                                                        name="Secondary Jet"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="secondary-jet">
                                                        <img
                                                            src={Images.SecondaryJet}
                                                            alt="Secondary Jet"
                                                        />
                                                        Secondary Jet
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    required
                                                    type="checkbox"
                                                    name="agreeTerms"
                                                />
                                                Other
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12">
                                        {/*<Button onClick={() =>toggleTab(MultiImageTabs.DateTimeLocation)}>Continue</Button>*/}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId={MultiImageTabs.ImageSequence}>
                                <Row>
                                    <Col sm={12}>
                                        <ImagePreview />
                                    </Col>
                                    <Col sm={12}>
                                        <Button type="submit">Continue</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ObservationImages;