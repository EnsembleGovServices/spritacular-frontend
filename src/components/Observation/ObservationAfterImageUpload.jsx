import { MultiImageTabs, Tabs } from "../../helpers/observation";
import { Icon } from "@iconify/react/dist/iconify";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink, 
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import ObservationUploadImg from "./ObservationUploadImg";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";
import LazyLoad from "../Upload/LazyLoad";
import ObservationCategory from "./ObservationCategory";


const ObservationAfterImageUpload = (props) => {
    const { toggleTab,handleImageInput } = props;
    const {observationImages,setObservationImages, observationSteps, setObservationCategory, setObservationType} = useObservations();
    const [isMultiple, setIsMultiple] = useState(false);
    const [activeTab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);
    const [isOther, setIsOther] = useState(false);

    // Toggle Tabs
    const toggleImageTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
        console.log(tab)
    };

    // const handleOtherToggle = (e) => {
    //     let map_data = {...observationImages?.data};
    //     setObservationImages
    // }

    const ImagePreview = () => {
        return (
            <>
                {observationImages?.data?.filter(item => item?.id === observationSteps?.selected_image_id).map((item, index) => {
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

    
    useEffect(() => {
        setObservationCategory((prev) => {
            return {
                ...prev,
                is_other: isOther
            }
        })
        if (isMultiple && activeTab === MultiImageTabs.MultipleImages) {
            setObservationType((prev) => {
                return {
                    ...prev,
                    image_type: 2
                }
            })
        } else if (!isMultiple)  {
            setObservationType((prev) => {
                return {
                    ...prev,
                    image_type: 1
                }
            })
        } else {
            setObservationType((prev) => {
                return {
                    ...prev,
                    image_type: 3
                }
            })
        }
    }, [activeTab, isMultiple, isOther, setObservationCategory, setObservationType])

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
                                <FormGroup check className="mb-3">
                                    <Label check>
                                        <Input type="checkbox" name="is_other" checked={observationImages?.data[observationImages?.selected_image_index]?.category_map?.is_other} onChange={(e) => handleImageInput(e)} />
                                        Other
                                    </Label>
                                </FormGroup>
                                {isOther?.status &&
                                    <FormGroup>
                                        <Input type="text"  name="text" placeholder="Please enter other details" className="other-textfield"/>
                                    </FormGroup>
                                }
                            </Col>
                            <Col sm={12}>
                                <Button type="submit" className="mt-3" onClick={() => toggleTab(Tabs.DateTimeLocation)} >Continue</Button>
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
