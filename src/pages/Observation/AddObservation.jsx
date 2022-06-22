import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    UncontrolledAlert,
} from "reactstrap";
import "../../assets/scss/component/uploadObservationImage.scss";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useObservations from "../../hooks/useObservations";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {baseURL, cameraSettingFields, routeUrls} from "../../helpers/url";
import {Tabs} from "../../helpers/observation";

import ObservationLocation from "../../components/Observation/ObservationLocation";
import ObservationUploadedImg from "../../components/Observation/ObservationUploadedImg";
import ObservationImages from "../../components/Observation/ObservationImages";
import ObservationProgress from "../../components/Observation/ObservationProgress";
import ObservationAfterImageUpload from "../../components/Observation/ObservationAfterImageUpload";
import EquipmentDetailsForm from "../../components/Observation/EquipmentDetailsForm";
import Loader from "../../components/Shared/Loader";

const AddObservation = () => {
    const {auth} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {
        observationSteps,
        setObservationSteps,
        observationImages,
        setObservationImages,
        observationData,
        setObservationData,
        observationType,
        setObservationType,
        cameraDetails,
        setCameraDetails,
    } = useObservations();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(Tabs.ObservationImages);
    const [next, setNext] = useState(false);
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [reset, setReset] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [deletedImage, setDeletedImage] = useState(null);
    const [draft, setDraft] = useState(true);
    const [draftData, setDraftData] = useState();

    let disabledLocation = false;
    for (let index = 0; index < observationData?.map_data?.length; index++) {
        if (
            observationData?.map_data?.[index] &&
            observationData?.map_data?.[index]?.category_map?.category.length > 0
        ) {
            disabledLocation = true;
        } else {
            disabledLocation = false;
            break;
        }
    }

    let disabledEquipment = false;
    for (let index = 0; index < observationData?.map_data?.length; index++) {
        if (
            observationData?.map_data?.[index] &&
            observationData?.map_data?.[index]?.azimuth &&
            observationData?.map_data?.[index]?.obs_time &&
            observationData?.map_data?.[index]?.obs_date &&
            observationData?.map_data?.[index]?.timezone &&
            observationData?.map_data?.[index]?.latitude &&
            observationData?.map_data?.[index]?.longitude
        ) {
            disabledEquipment = true;
        } else {
            disabledEquipment = false;
            break;
        }
    }

    const disabledLocationTab = observationData?.image_type !== 3 ? disabledLocation && next : next;
    const disabledEquipmentTab = disabledLocation && next && disabledEquipment;

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
        window.scrollTo(0, 0);
    };

    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
        setCameraDetails({
            ...cameraDetails,
            [name]: value,
        });

        setObservationData((prev) => {
            return {
                ...prev,
                camera: cameraDetails,
            };
        });
    };

    const handleOtherCamera = (e) => {
        let name = e.target.name,
            value = e.target.value;

        setObservationData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleImageInput = (e, address = null) => {
        let observationArray = {...observationImages};
        if (e === "address") {
            observationArray.data[observationImages?.selected_image_index][
                "location"
                ] = address;
            if (observationArray.data[1]) {
                observationArray.data[1].category_map["location"] = address;
            }
            if (observationArray.data[2]) {
                observationArray.data[2].category_map["location"] = address;
            }
        } else {
            let name = e.target.name,
                value = e.target.value;

            // if (name === "is_other") {
            //     observationArray.data[
            //         observationImages?.selected_image_index
            //         ].category_map[name] = e.target.checked;
            //     if (observationData?.image_type === 3) {
            //         if (observationArray.data[1]) {
            //             observationArray.data[1].category_map[name] = e.target.checked;
            //         }
            //         if (observationArray.data[2]) {
            //             observationArray.data[2].category_map[name] = e.target.checked;
            //         }
            //     }
            // } else {
            //     if (name === "is_precise_azimuth") {
            //         observationArray.data[observationImages?.selected_image_index][name] =
            //             e.target.checked === true ? 1 : 0;
            //         if (observationData?.image_type === 3) {
            //             if (observationArray.data[1]) {
            //                 observationArray.data[1]["is_precise_azimuth"] =
            //                     e.target.checked === true ? 1 : 0;
            //             }
            //             if (observationArray.data[2]) {
            //                 observationArray.data[2]["is_precise_azimuth"] =
            //                     e.target.checked === true ? 1 : 0;
            //             }
            //         }
            //         if (e.target.checked === false) {
            //             observationArray.data[observationImages?.selected_image_index][
            //                 "azimuth"
            //                 ] =
            //                 observationArray && observationArray.data
            //                     ? observationArray.data[
            //                         observationImages?.selected_image_index
            //                         ]["azimuth"]
            //                     : undefined;
            //             if (observationData?.image_type === 3) {
            //                 if (observationArray.data[1]) {
            //                     observationArray.data[1]["azimuth"] =
            //                         observationArray?.data?.[0]["azimuth"];
            //                 }
            //                 if (observationArray.data[2]) {
            //                     observationArray.data[2]["azimuth"] =
            //                         observationArray?.data?.[0]["azimuth"];
            //                 }
            //             }
            //         }
            //     } else {
            //         observationArray.data[observationImages?.selected_image_index][name] =
            //             value;
            //         if (observationData?.image_type === 3) {
            //             if (observationArray.data[1]) {
            //                 observationArray.data[1][name] = value;
            //             }
            //             if (observationArray.data[2]) {
            //                 observationArray.data[2][name] = value;
            //             }
            //         }
            //     }
            // }


            if (name === "is_precise_azimuth") {
                observationArray.data[observationImages?.selected_image_index][name] =
                    e.target.checked === true ? 1 : 0;
                if (observationData?.image_type === 3) {
                    if (observationArray.data[1]) {
                        observationArray.data[1]["is_precise_azimuth"] =
                            e.target.checked === true ? 1 : 0;
                    }
                    if (observationArray.data[2]) {
                        observationArray.data[2]["is_precise_azimuth"] =
                            e.target.checked === true ? 1 : 0;
                    }
                }
                if (e.target.checked === false) {
                    observationArray.data[observationImages?.selected_image_index][
                        "azimuth"
                        ] =
                        observationArray && observationArray.data
                            ? observationArray.data[
                                observationImages?.selected_image_index
                                ]["azimuth"]
                            : undefined;
                    if (observationData?.image_type === 3) {
                        if (observationArray.data[1]) {
                            observationArray.data[1]["azimuth"] =
                                observationArray?.data?.[0]["azimuth"];
                        }
                        if (observationArray.data[2]) {
                            observationArray.data[2]["azimuth"] =
                                observationArray?.data?.[0]["azimuth"];
                        }
                    }
                }
            } else {
                observationArray.data[observationImages?.selected_image_index][name] =
                    value;
                if (observationData?.image_type === 3) {
                    if (observationArray.data[1]) {
                        observationArray.data[1][name] = value;
                    }
                    if (observationArray.data[2]) {
                        observationArray.data[2][name] = value;
                    }
                }
            }
        }
        setObservationImages(observationArray);
    };

    const handlesetDraft = () => {
        setIsLoading(true);
        sendData(1).then((r) => r);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDraft(0);
        sendData(0).then((r) => r);
    };

    const sendData = async (draft) => {
        const cloneDeep = require("lodash.clonedeep");
        const formData = new FormData();
        const finalData = cloneDeep(observationData);
        finalData?.map_data?.map((item, index) => {
            delete item["image"];
            formData.append("image_" + index, item.item);
            return true;
        });
        if (draft === 1) {
            finalData.is_draft = draft;
        }
        finalData.camera = cameraDetails
            ? cameraDetails
            : auth?.camera
                ? auth?.camera?.id
                : null;
        formData.append("data", JSON.stringify(finalData));

        if (!updateMode) {
            await axios
                .post(baseURL.api + "/observation/upload_observation/", formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token?.access}`,
                    },
                })
                .then((response) => {
                    setError(null);
                    setSuccess({
                        data: response?.data,
                        status: response?.status,
                        message: response?.message,
                    });
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                    setTimeout(function () {
                        handleReset();
                    }, 500);
                })
                .catch((error) => {
                    console.log(error.response);
                    setIsLoading(false);
                    setError({
                        data: error?.response?.data,
                        status: error?.response?.status,
                        message: error?.message,
                    });
                });
        } else {
            await axios
                .put(
                    baseURL.api +
                    `/observation/update_observation/${observationSteps?.mode?.id}/`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${auth?.token?.access}`,
                        },
                    }
                )
                .then((response) => {
                    setError(null);
                    setSuccess({
                        data: response?.data,
                        status: response?.status,
                        message: response?.message,
                    });
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                    setTimeout(function () {
                        handleReset();
                    }, 500);
                })
                .catch((error) => {
                    console.log(error.response);
                    setIsLoading(false);
                    setError({
                        data: error?.response?.data,
                        status: error?.response?.status,
                        message: error?.message,
                    });
                });
        }
    };

    const getCameraDetail = async (e) => {
        if (e.target.checked === true) {
            await axios
                .get(baseURL.api + "/users/camera_setting/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token?.access}`,
                    },
                })
                .then((response) => {
                    setCameraDetails(response?.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else {
            setCameraDetails(cameraSettingFields);
        }
    };

    const handleContinue = () => {
        setNext(!next);
    };

    const handleReset = (e) => {
        navigate("/observations");
        setReset(true);
        setObservationSteps({
            total: 3,
            active: 1,
            mode: {
                update: true,
                id: false,
            },
        });
        setObservationImages([]);
        setObservationData(null);
        console.clear();
    };

    const removeItem = (id) => {
        let newImage = [];
        observationData?.map_data
            ?.filter((item) => item.id !== id)
            .map((item, index) => {
                return newImage.push(item);
            });
        if (newImage.length > 0) {
            setObservationSteps((prev) => {
                return {
                    ...prev,
                    selected_image_id: newImage?.[0].id,
                    selected_image_index: 0,
                    observation_count: newImage.length,
                };
            });
            setObservationImages((prev) => {
                return {
                    ...prev,
                    observation_count: newImage.length,
                    selected_image_id: newImage?.[0].id,
                    selected_image_index: 0,
                    data: newImage,
                };
            });
            setObservationData((prev) => {
                return {
                    ...prev,
                    map_data: newImage,
                };
            });
            setDeletedImage(id);
        } else {
            window.location.reload();
        }
    };

    const showUploadedPreview = () => {
        return !(
            !(
                observationImages?.data &&
                next &&
                activeTab === Tabs.ObservationImages
            ) &&
            !(
                activeTab === Tabs.DateTimeLocation &&
                !(observationType?.image_type === 3) &&
                !(observationType?.image_type === 1)
            )
        );
    };

    const getFileName = (url) => {
        return url.split(/[#?]/)[0].split("/").pop().trim();
    };

    const getObservationDataForUpdate = async (obvId) => {
        await axios
            .get(baseURL.api + `/observation/get_draft_data/${obvId}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token?.access}`,
                },
            })
            .then((response) => {
                let data = response?.data?.data;
                setDraftData({
                    image_type: data.image_type,
                    elevation_angle: data.elevation_angle,
                    video_url: data.video_url,
                    camera: data.camera_data,
                    question_field_one: data.question_field_one,
                    question_field_two: data.question_field_two,
                    story: data.story,
                    map_data: data.images,
                });
                setCameraDetails(data?.camera_data);
                setUpdateMode(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        draftData?.map_data?.map((item, index) => {
            let imageUrl = item.image,
                fileName = getFileName(imageUrl);
            return fetch(imageUrl)
                .then(async (response) => {
                    const contentType = response.headers.get("content-type");
                    const blob = await response
                        .blob()
                        .catch((error) => console.log("blob error", error));
                    const file = new File([blob], fileName, {contentType});
                    const image = await toBase64(file).catch((error) =>
                        console.log("base64 Error", error)
                    );
                    item.compressed_image = null;
                    setTimeout(function () {
                        item.item = file;
                        item.image = image;
                        item.name = file.name;
                        item.lastModified = file.lastModified;
                    }, 500);
                    return file;
                })
                .catch((error) =>
                    console.log(
                        `Error converting the CDN image to file object at index [${index}] [${error}]`
                    )
                );
        });
    }, [draftData, setObservationImages]);

    useEffect(() => {
        let id = observationSteps?.mode?.id,
            updateUrl = location.pathname === `/${routeUrls.observationsUpdate}`,
            obvType = observationSteps?.mode?.type;

        if (updateUrl && obvType === "draft") {
            getObservationDataForUpdate(id).then((r) => r);
            setObservationSteps((prev) => {
                return {
                    ...prev,
                    converted: true,
                };
            });
        }

        if (updateUrl && obvType !== "draft") {
            return navigate("/observations");
        }
    }, [location?.pathname, updateMode, observationSteps?.converted]);

    useEffect(() => {
        let existingObvImageData = {...observationImages},
            obvType = {...observationType};

        setObservationType({
            ...obvType,
            image_type: draftData?.image_type === 2 ? 1 : draftData?.image_type,
        });
        setObservationImages({
            ...existingObvImageData,
            data: draftData?.map_data,
            selected_image_id: draftData?.map_data[0].id,
            selected_image_index: 0,
            observation_count: draftData?.map_data.length,
        });
    }, [draftData, setObservationImages]);

    // Set Progress Bar
    useEffect(() => {
        function setActiveTabForProgressBar() {
            if (activeTab === Tabs.ObservationImages) {
                return 1;
            } else if (activeTab === Tabs.DateTimeLocation) {
                return 2;
            } else {
                return 3;
            }
        }

        setObservationSteps((prev) => {
            return {
                ...prev,
                active: setActiveTabForProgressBar(),
                selected_image_id: observationImages?.selected_image_id,
                selected_image_index: observationImages?.selected_image_index,
                is_draft: draft,
            };
        });
    }, [activeTab, draft, observationImages, setObservationSteps]);

    return (
        <div className="position-relative">
            {isLoading && <Loader fixContent={true}/>}
            {success && (
                <UncontrolledAlert
                    color="success"
                    data-dismiss="alert"
                    dismissible="true"
                    className="text-center mt-3 d-inline-block w-100"
                >
                    {success?.data?.success}
                </UncontrolledAlert>
            )}
            <Form
                className="observation-form upload-observation-form-main"
                onSubmit={handleSubmit}
            >
                <div className="common-top-button-wrapper">
                    <Container>
                        <div className="common-top-button-wrapper-inner">
                            <Button
                                className="gray-outline-btn"
                                onClick={handleReset}
                                disabled={!observationImages?.data}
                            >
                                Cancel
                            </Button>
                            <div className="top-right-btn">
                                <Button
                                    className="gray-outline-btn me-2 me-sm-3"
                                    onClick={handlesetDraft}
                                    disabled={!next}
                                >
                                    Save as draft
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        !(
                                            cameraDetails?.camera_type &&
                                            cameraDetails?.focal_length &&
                                            cameraDetails?.aperture
                                        )
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <section className="upload-observation-form-inner">
                    <Container>
                        <Row>
                            <Col md={3} sm={12}>
                                <div className="observation-form-left-tab">
                                    <ObservationProgress step={observationSteps}/>
                                    <Nav tabs className="flex-column">
                                        <NavItem>
                                            <NavLink
                                                className={
                                                    activeTab === Tabs.ObservationImages ? "active" : ""
                                                }
                                                onClick={() => {
                                                    if (
                                                        observationData?.map_data?.[0]?.category_map
                                                            ?.category &&
                                                        next
                                                    ) {
                                                        toggleTab(Tabs.ObservationImages);
                                                    }
                                                }}
                                            >
                                                Observation Images
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={`${
                                                    activeTab === Tabs.DateTimeLocation ? "active" : ""
                                                } ${disabledLocationTab ? "" : "disabled"}`}
                                                onClick={() => {
                                                    if (disabledLocationTab) {
                                                        toggleTab(Tabs.DateTimeLocation);
                                                    }
                                                }}
                                            >
                                                Date, Time & Location
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={`${
                                                    activeTab === Tabs.EquipmentDetails ? "active" : ""
                                                } ${disabledEquipmentTab ? "" : "disabled"}`}
                                                onClick={() => {
                                                    if (disabledEquipmentTab) {
                                                        toggleTab(Tabs.EquipmentDetails);
                                                    }
                                                }}
                                            >
                                                Equipment Details
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </Col>

                            <Col
                                md={
                                    observationImages?.data?.length > 0 &&
                                    next &&
                                    !(activeTab === Tabs.EquipmentDetails)
                                        ? 7
                                        : 9
                                }
                                sm={
                                    observationImages?.data?.length > 0 &&
                                    next &&
                                    !(activeTab === Tabs.EquipmentDetails)
                                        ? 9
                                        : 12
                                }
                            >
                                <div className="observation-form-middle-tab">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={Tabs.ObservationImages}>
                                            {next ? (
                                                <ObservationAfterImageUpload
                                                    mode={updateMode}
                                                    showUploadedPreview={showUploadedPreview}
                                                    obvType={observationType}
                                                    step={observationSteps}
                                                    error={error}
                                                    detectImage={deletedImage}
                                                    remove={removeItem}
                                                    toggleTab={toggleTab}
                                                    disableNext={disabledLocationTab}
                                                    handleImageInput={handleImageInput}
                                                />
                                            ) : (
                                                <ObservationImages
                                                    mode={updateMode}
                                                    detectImage={deletedImage}
                                                    remove={removeItem}
                                                    proceedNext={() => handleContinue()}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane
                                            tabId={Tabs.DateTimeLocation}
                                            className="observation_location"
                                        >
                                            {showUploadedPreview() && (
                                                <div
                                                    className="observation-form-right-tab d-flex justify-content-start justify-content-sm-end d-sm-none position-relative position-sm-sticky">
                                                    <ObservationUploadedImg
                                                        obvType={observationType}
                                                        step={observationSteps}
                                                        error={error}
                                                        remove={removeItem}
                                                    />
                                                </div>
                                            )}
                                            {observationImages?.data && (
                                                <ObservationLocation
                                                    mode={updateMode}
                                                    obvType={observationType}
                                                    step={observationSteps}
                                                    error={error}
                                                    toggleTab={toggleTab}
                                                    handleImageInput={handleImageInput}
                                                    disableNext={disabledEquipmentTab}
                                                />
                                            )}
                                        </TabPane>
                                        <TabPane
                                            tabId={Tabs.EquipmentDetails}
                                            className="observation_equipment"
                                        >
                                            {auth?.user?.camera && (
                                                <FormGroup
                                                    check
                                                    className="d-flex align-items-center position-relative mb-3"
                                                >
                                                    <Label check>
                                                        <Input
                                                            type="checkbox"
                                                            name="profileData"
                                                            checked={isSwitchOn}
                                                            disabled={!auth?.user?.camera}
                                                            onChange={(e) => {
                                                                setSwitchOn(!isSwitchOn);
                                                                getCameraDetail(e).then((r) => r);
                                                            }}
                                                        />
                                                        Pull data from my profile
                                                    </Label>
                                                </FormGroup>
                                            )}
                                            <EquipmentDetailsForm
                                                step={observationSteps}
                                                isSwitchOn={isSwitchOn}
                                                error={error}
                                                handleInput={handleInput}
                                                toggleTab={toggleTab}
                                                cameraDetails={cameraDetails}
                                                handleOtherCamera={handleOtherCamera}
                                                getCameraDetail={getCameraDetail}
                                            />
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </Col>

                            {showUploadedPreview() && (
                                <Col
                                    md={2}
                                    sm={3}
                                    className="d-none d-sm-block overflow-hidden"
                                >
                                    <div className="observation-form-right-tab">
                                        <ObservationUploadedImg
                                            obvType={observationType}
                                            step={observationSteps}
                                            error={error}
                                            remove={removeItem}
                                        />
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
            </Form>
        </div>
    );
};

export default AddObservation;
