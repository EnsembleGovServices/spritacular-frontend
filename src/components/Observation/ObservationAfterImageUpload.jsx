import { MultiImageTabs, Tabs } from "../../helpers/observation";
import { Icon } from "@iconify/react/dist/iconify";
import {Button, Col, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import { useState } from "react";
import useObservations from "../../hooks/useObservations";
import LazyLoad from "../Upload/LazyLoad";
import { Category } from "../../helpers/observation";

const ObservationAfterImageUpload = (props) => {
    const { toggleTab } = props;
    const {observationImages} = useObservations();
    const [isMultiple, setIsMultiple] = useState(false);
    const [activeTab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);
    const [isOther, setIsOther] = useState(false);

    // Toggle Tabs
    const toggleImageTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };

    const ImagePreview = () => {
        return (
            <>
                {observationImages?.images?.filter(item => item?.id === observationImages?.selected).map((item, index) => {
                    return(
                        <div key={index} className="upload-multiple-observation">
                            <div className="observation-image position-relative">
                                <Button className="bg-transparent text-black border-0 shadow-none p-0 position-absolute">
                                    <Icon icon="ci:close-big" />
                                </Button>
                                <LazyLoad src={item?.image} alt={item?.name} />
                            </div>
                        </div>
                    )
                })}
            </>
        );
    };

    const ObservationCategory = () => {
        return(
            Category?.map((imagItem, index)=>{
                return (
                    <Col sm={6} key={index}>
                        <FormGroup>
                            <div className="checkbox-wrapper">
                                <div className="inputGroup">
                                    <input id={imagItem.id} name={imagItem.name} type="checkbox" />
                                    <label htmlFor={imagItem.id}>
                                        <img src={imagItem.image} alt={imagItem.name} />
                                        {imagItem.name}
                                    </label>
                                </div>
                            </div>
                        </FormGroup>
                    </Col>
                )
            })
        )
    }

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
                                    toggleImageTab(MultiImageTabs.MultipleImages);
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
                                    toggleImageTab(MultiImageTabs.ImageSequence);
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
                            <ObservationCategory />
                            <Col sm={12}>
                                <FormGroup check>
                                    <Label check>
                                        <Input required type="checkbox" name="other" onChange={(e)=> setIsOther(e.target.checked)} />
                                        Other
                                    </Label>
                                </FormGroup>
                                {isOther && 
                                    <FormGroup>
                                        <Input type="text"  name="text" placeholder="Please enter other details" className="other-textfield"/>
                                    </FormGroup>
                                }
                            </Col>
                            <Col sm={12}>
                                <Button type="submit" onClick={() => toggleTab(Tabs.DateTimeLocation)} >Continue</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId={MultiImageTabs.ImageSequence}>
                        <Row>
                            <Col sm={12}>
                                <ImagePreview />
                            </Col>
                            <Col sm={12}>
                                <Button type="submit" onClick={() => toggleTab(Tabs.DateTimeLocation)} >Continue</Button>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    );
};
export default ObservationAfterImageUpload;
