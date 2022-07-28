import {MultiImageTabs, Tabs} from "../../helpers/observation";
import {
    Button,
    Col,
    FormGroup,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import PropTypes from "prop-types";
import ObservationUploadImg from "./ObservationUploadImg";
import {useEffect, useLayoutEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";
import ObservationCategory from "./ObservationCategory";
import ImagePreview from "./ImagePreview";
import ObservationUploadedImg from './ObservationUploadedImg';
import DeleteItemConfirmationPopup from "../Popup/DeleteItemConfirmationPopup";


const ObservationAfterImageUpload = (props) => {
    const {
        toggleTab,
        error,
        disableNext,
        obvType,
        remove,
        detectImage,
        step,
        showUploadedPreview,
        mode,
    } = props;
    const {
        observationImages,
        setObservationImages,
        observationType,
        setObservationCategory,
        setObservationType,
    } = useObservations();
    const [isMultiple, setIsMultiple] = useState(false);
    const [activeTab, setActiveImageTab] = useState(MultiImageTabs.MultipleImages);
    const [isOther] = useState(false);
    const [isConfirmPopUp, setIsConfirmPopUp] = useState(true);
    const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);

    // Toggle Tabs
    // const toggleImageTab = (tab) => {
    //     if (activeTab !== tab) {
    //         setActiveImageTab(tab);
    //     }
    // };

    const handleMultipleCheck = (e) => {
        if (isMultiple) {
            handleConfirmationPopUp();
        }
    }

    const handleConfirmation = () => {
        if (observationImages?.data?.length === 1) {
            setIsConfirmPopUp(true);
            setIsMultiple(false);
            setShouldShowConfirmation(false);
        } else {
            const selectedObvIndex = step?.selected_image_index;
            const filteredData = observationImages?.data?.filter((item, index) => {
                return index === selectedObvIndex;
            });
            setObservationImages((prev) => {
                return {
                    ...prev,
                    data: filteredData,
                    observation_count: 1,
                    selected_image_id: step?.selected_image_id,
                    selected_image_index: 0
                }
            });
            setObservationType((prev) => {
                return {
                    ...prev,
                    image_type: 1
                }
            })
            setActiveImageTab(MultiImageTabs.MultipleImages)
            setIsConfirmPopUp(true);
            setIsMultiple(false);
            setShouldShowConfirmation(false);
        }
    }

    const handleConfirmationPopUp = () => {
        setShouldShowConfirmation(!isConfirmPopUp);
        setIsConfirmPopUp(!isConfirmPopUp);
    }

    useEffect(() => {
        if (isMultiple && observationImages?.data?.length > 1) {
            handleConfirmationPopUp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMultiple])


    useEffect(() => {
        setIsMultiple(observationImages?.data?.length > 1);

    }, [observationImages?.data?.length])


    useEffect(() => {
        setObservationCategory((prev) => {
            return {
                ...prev,
                is_other: isOther
            }
        })

        if (!mode) {
            if (isMultiple && activeTab === MultiImageTabs.MultipleImages) {
                setObservationType((prev) => {
                    return {
                        ...prev,
                        image_type: 3
                    }
                })
            } else if (!isMultiple) {
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
        } else {
            setObservationType((prev) => {
                return {
                    ...prev,
                    image_type: observationType?.image_type === 3 ? 3 : 1
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, isMultiple, isOther, setObservationCategory, setObservationType]);

    useLayoutEffect(() => {
        setActiveImageTab(observationType?.image_type === 3 ? MultiImageTabs.ImageSequence : MultiImageTabs.MultipleImages);
    }, [observationType?.image_type])

    return (
        <>
            <Row>
                {!mode &&
                    <Col sm={12}>
                        <FormGroup className="d-flex align-items-center position-relative">
                            <div className="custom-switch">
                                <input
                                    id="toggleMultiple"
                                    type="checkbox"
                                    className="hidden"
                                    checked={isMultiple}
                                    onClick={(e) => handleMultipleCheck(e)}
                                    onChange={(e) => setIsMultiple(true)}
                                />
                                <label className="switchbox" htmlFor="toggleMultiple"/>
                                {/*<span>Multiple Observations (limit to 3)</span>*/}
                                <span>I have an image sequence for this event (limit to 3)</span>
                            </div>
                        </FormGroup>
                    </Col>
                }
                {/*{isMultiple && !mode &&*/}
                {/*    <Col sm={12}>*/}
                {/*        <Nav tabs>*/}
                {/*            <NavItem>*/}
                {/*                <NavLink*/}
                {/*                    className={activeTab === MultiImageTabs.MultipleImages ? 'active' : ''}*/}
                {/*                    onClick={() => {*/}
                {/*                        toggleImageTab(MultiImageTabs.MultipleImages);*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <Icon icon="fluent:square-multiple-20-regular" color="black" width={24}*/}
                {/*                          className="me-3"/>*/}
                {/*                    Multiple images*/}
                {/*                </NavLink>*/}
                {/*            </NavItem>*/}
                {/*            <NavItem>*/}
                {/*                <NavLink*/}
                {/*                    className={activeTab === MultiImageTabs.ImageSequence ? 'active' : ''}*/}
                {/*                    onClick={() => {*/}
                {/*                        toggleImageTab(MultiImageTabs.ImageSequence);*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <Icon icon="codicon:list-filter" color="black" width={24} className="me-3"/>*/}
                {/*                    <div>*/}
                {/*                        Image Sequence*/}
                {/*                        <p className="mb-0">Images sequence extracted from a video</p>*/}
                {/*                    </div>*/}
                {/*                </NavLink>*/}
                {/*            </NavItem>*/}
                {/*        </Nav>*/}
                {/*    </Col>*/}
                {/*}*/}
                <Col sm={12}>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId={MultiImageTabs.MultipleImages}>
                            <Row>
                                {isMultiple &&
                                    <Col sm={12}>
                                        <ObservationUploadImg small={true} detectImage={detectImage} imageFormat={false}
                                                              maxLimit={false} multiple={false}/>
                                    </Col>
                                }
                                {showUploadedPreview &&
                                    <Col sm={12}>
                                        <div className="d-flex justify-content-start justify-content-sm-end d-sm-none">
                                            <ObservationUploadedImg obvType={obvType} step={step} error={error}
                                                                    remove={remove}/></div>
                                    </Col>
                                }
                                <Col sm={12}>
                                    <ImagePreview remove={remove}/>
                                </Col>

                                <Col sm={12}>
                                    <ObservationCategory obvType={obvType} error={error}/>
                                </Col>
                                <Col sm={12}>
                                    <Button type="button" className="mt-3" disabled={!disableNext}
                                            onClick={() => toggleTab(Tabs.DateTimeLocation)}>Continue</Button>
                                    {/*<Button type="button" outline={true}*/}
                                    {/*        onClick={() => handleNextImage(observationSteps?.selected_image_index)}*/}
                                    {/*        className="mt-3 ms-2 btn-dark px-4 py-2">Proceed Next*/}
                                    {/*    Image</Button>*/}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId={MultiImageTabs.ImageSequence}>
                            <Row>

                                {isMultiple &&
                                    <Col sm={12}>
                                        <div className="small-upload_box mb-3">
                                            <ObservationUploadImg small={true} detectImage={detectImage}
                                                                  imageFormat={false}
                                                                  maxLimit={false} multiple={false}/>
                                        </div>
                                    </Col>
                                }
                                {showUploadedPreview &&
                                    <Col sm={12}>
                                        <div className="d-flex justify-content-end d-sm-none"><ObservationUploadedImg
                                            obvType={obvType} step={step} error={error} remove={remove}/></div>
                                    </Col>
                                }
                                <Col sm={12}>
                                    <ImagePreview remove={remove}/>
                                </Col>
                                <Col sm={12}>
                                    <ObservationCategory obvType={obvType} error={error}/>
                                </Col>
                                <Col sm={12}>
                                    <Button type="button"
                                            onClick={() => toggleTab(Tabs.DateTimeLocation)}>Continue</Button>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>

            {isConfirmPopUp && shouldShowConfirmation &&
                <DeleteItemConfirmationPopup
                    open={isConfirmPopUp && shouldShowConfirmation}
                    handleClose={handleConfirmationPopUp}
                    handleConfirmation={handleConfirmation}
                />
            }
        </>
    );
};

ObservationAfterImageUpload.propTypes = {
    remove: PropTypes.func,
};
export default ObservationAfterImageUpload;
