import { MultiImageTabs } from "../../helpers/observation";
import { Icon } from "@iconify/react/dist/iconify";
import {Button, Col, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import Images from "../../static/images";
import { useState } from "react";

const ObservationAfterImageUpload = () => {
    const [isMultiple, setIsMultiple] = useState(false);
    const [activeTab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };

    const ImagePreview = () => {
        return (
            <div className="upload-multiple-observation">
                <div className="observation-image position-relative">
                    <Button className="bg-transparent text-black border-0 shadow-none p-0 position-absolute">
                        <Icon icon="ci:close-big" />
                    </Button>
                    <img src={Images.ObservationImageOne} alt="Bluejet" />
                </div>
            </div>
        );
    };

    return (
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
                        <label className="switchbox" htmlFor="toggleMultiple" />
                        <span>Multiple Observations (limit to 3)</span>
                    </div>
                </FormGroup>
            </Col>
            {isMultiple &&
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
            }
            <Col sm={12}>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={MultiImageTabs.MultipleImages}>
                        <Row>
                            {/*<Col sm={12} className={isMultiple ? '' : 'd-none'}>*/}
                            {/*    <div className="small-upload_box mb-3">*/}
                            {/*        <ObservationUploadImg imageFormat={false} maxLimit={false} multiple={isMultiple} />*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            {isMultiple &&
                                <Col sm={12}>
                                    <div className="small-upload_box mb-3">
                                        <ObservationUploadImg imageFormat={false} maxLimit={false} multiple={false} />
                                    </div>
                                </Col>
                            }
                            <Col sm={12}>
                                <ImagePreview />
                            </Col>
                            <Col sm={12}>
                                <FormGroup className="mb-1">
                                    <p className="fw-bold">
                                        Please choose the appropriate category
                                        <span className="required">Required</span>
                                    </p>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <div className="checkbox-wrapper">
                                        <div className="inputGroup">
                                            <input id="sprite" name="option1" type="checkbox" />
                                            <label htmlFor="sprite">
                                                <img src={Images.SpriteOb} alt="Sprite" />
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
                                            <input id="blue-jet" name="BlueJet" type="checkbox" />
                                            <label htmlFor="blue-jet">
                                                <img src={Images.Bluejet} alt="Bluejet" />
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
                                            <input id="elve" name="Elve" type="checkbox" />
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
                                            <input id="halo" name="Halo" type="checkbox" />
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
                                            <input id="gigantic-jet" name="Gigantic Jet" type="checkbox" />
                                            <label htmlFor="gigantic-jet">
                                                <img src={Images.GiganticJet} alt="Sprite" />
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
                                            <input id="secondary-jet" name="Secondary Jet" type="checkbox" />
                                            <label htmlFor="secondary-jet">
                                                <img src={Images.SecondaryJet} alt="Secondary Jet" />
                                                Secondary Jet
                                            </label>
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col sm={12}>
                                <FormGroup check>
                                    <Label check>
                                        <Input required type="checkbox" name="agreeTerms" />
                                        Other
                                    </Label>
                                </FormGroup>
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
    );
};
export default ObservationAfterImageUpload;
