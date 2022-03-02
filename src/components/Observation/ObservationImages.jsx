import { useState, useEffect } from "react";
import { Row, Col, FormGroup, Input, Button, Label, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Images from "../../static/images";
import { Icon } from "@iconify/react";
import { MultiImageTabs } from "../../helpers/observation";

const ObservationImages = () =>{
    const [activeimagetab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeimagetab !== tab) {
            setActiveImageTab(tab);
        }
    };


    const ImagePreview = () =>{
        return(
            <>
                <div className="observation-image position-relative">
                    <Button className="bg-transparent text-black border-0 shadow-none p-0 position-absolute"><Icon icon="ci:close-big" /></Button>
                    <img
                        src={Images.ObservationImageOne}
                        alt="Bluejet"
                    />
                </div>
            </>
        )
    }

    
    return (
        <Row>
            <Col sm={12}>
                <FormGroup className="d-flex align-items-center position-relative">
                <input
                    id="checkbox3"
                    type="checkbox"
                    className="custom-switch hidden"
                />
                <label
                    className="switchbox"
                    htmlFor="checkbox3"
                />
                <span>
                    Multiple Observations (limit to 3)
                </span>
                </FormGroup>
            </Col>
            <Col sm={12}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeimagetab === MultiImageTabs.MultipleImages ? 'active' : ''}
                            onClick={() => {
                                toggleTab(MultiImageTabs.MultipleImages);
                            }}
                        >
                            <Icon icon="fluent:square-multiple-20-regular" color="black" className="me-3" />
                            Multiple images
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeimagetab === MultiImageTabs.ImageSequence ? 'active' : ''}
                            onClick={() => {
                                toggleTab(MultiImageTabs.ImageSequence);
                            }}
                        >
                            <Icon icon="codicon:list-filter" color="black" className="me-3" />
                            Image Sequence
                            <p>Images sequence extracted from a video</p>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
            <Col sm={12}>
                <TabContent activeimagetab={activeimagetab.MultiImageTabs}>
                    <TabPane tabId={MultiImageTabs.MultipleImages}>
                        <Row>
                            <Col sm={12}>
                                <FormGroup className="mb-1">
                                <p className="fw-bold">
                                    Please choose the appropriate category
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
                                <Button onClick={() =>toggleTab(MultiImageTabs.DateTimeLocation)}>Continue</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId={MultiImageTabs.ImageSequence}>
                                Hello
                        {/* <Row>
                            <Col sm={12}>
                                <ImagePreview />
                            </Col>
                            <Col sm={12}>
                                <Button type="submit">Continue</Button>
                            </Col>
                        </Row> */}
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    )
}

export default ObservationImages;