import {Col, FormGroup, Label, Row} from "reactstrap";
import {useEffect, useState, Fragment} from "react";
import useObservations from "../../hooks/useObservations";
import useAuth from "../../hooks/useAuth";
import {cdn} from "../../helpers/url";

const ObservationCategory = (props) => {
    const {error, obvType} = props;
    const {auth} = useAuth();
    const {
        observationImages,
        setObservationImages,
        observationSteps,
        observationCategory,
        setObservationCategory,
        observationData,
        setObservationData
    } = useObservations();
    const [Category, setCategory] = useState([]);
    const [oldCategory, setOldCategory] = useState([]);
    const [isChecked, setIsChecked] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('' || []);
    const ObservationData = {...observationImages};
    const errorData = error ? Object.values(error?.data) : {};
    // const [isPopoverContentOpen, setIsPopoverContentOpen] = useState(false);
    // const tippyRef = useRef();

    // Category update on Check
    const onCategoryChange = (e) => {
        const value = parseFloat(e.target.id);
        setIsChecked({...isChecked, [e.target.name]: e.target.checked});
        if (selectedCategory.includes(value)) {
            const filterValue = selectedCategory.filter((item) => item !== value)
            setSelectedCategory(filterValue);
        } else {
            setSelectedCategory([...selectedCategory, value]);
        }
        setObservationImages(ObservationData);
    }

    // Updates category to db
    const updatedCategory = () => {
        let newCategory = [];
        oldCategory?.map((item, index) => {
            let image = `${cdn.url}/category/${item?.name.toLowerCase().replaceAll(" ", "")}.png`

            item.image = image
            newCategory.push(item)
            return true;
        })
        setCategory(newCategory);

        setObservationCategory(prev => {
            return {
                ...prev,
                data: newCategory
            }
        });
    }

    // Tooltip image slider
    // const ImageCarousel = (props) => {
    //     const { className } = props;
    //     const items = [
    //         { src: `${cdn.url}/card1.jpeg` },
    //         { src: `${cdn.url}/card2.jpeg` },
    //         { src: `${cdn.url}/card3.jpeg` }
    //     ]
    //     const carouselContent = items.map((item, index) => {
    //         return (
    //             <SwiperSlide key={index}>
    //                 <img src={item.src} alt="carousel" />
    //             </SwiperSlide>
    //         );
    //     });
    //     return (
    //         <>
    //             <Swiper navigation={true} modules={[Navigation]} className={`className ${className ? className : ''}`}>
    //                 {carouselContent}
    //             </Swiper>
    //         </>
    //     )
    // }

    // Tooltip inner content
    // const PopoverContent = ({ catName }) => {
    //     return (
    //         <>
    //             <PopoverHeader className={'bg-white'}>What is {catName}?</PopoverHeader>
    //             <PopoverBody className={'bg-white'}>
    //                 <p style={{ '--line-clamb': isPopoverContentOpen === true ? 'unset' : '2' }}>
    //                     Sprites or red sprites are large-scale electric discharges that occur high above thunderstorm
    //                     clouds, they appear as luminous reddish-orange flashes.
    //                 </p>
    //                 <Collapse isOpen={isPopoverContentOpen}>
    //                     <ImageCarousel className="popover-carousel" />
    //                 </Collapse>
    //                 <Button className="bg-transparent p-0 border-0 text-secondary shadow-none d-block"
    //                     onClick={() => setIsPopoverContentOpen(!isPopoverContentOpen)}>
    //                     {isPopoverContentOpen === true ? 'Show less' : 'Show more'}
    //                 </Button>
    //             </PopoverBody>
    //         </>
    //     );
    // };

    // List out category

    const showCategory = () => {
        return observationImages?.data?.filter((item) => item.id === observationImages?.selected_image_id).map((item, index) => {
            return (
                <Fragment key={index}>
                    {
                        Category?.length > 0 && observationCategory?.data?.map((imagItem, index) => {
                            return (
                                <Col sm={6} key={index}>
                                    <FormGroup>
                                        <div className="checkbox-wrapper">
                                            <div className="inputGroup">
                                                <input
                                                    value={imagItem.name || ''}
                                                    name={imagItem.id}
                                                    id={imagItem.id}
                                                    type="checkbox"
                                                    checked={(item?.category_map?.category?.find(list => list === imagItem?.id) === imagItem?.id) ? 'checked' : ''}
                                                    hidden
                                                    onChange={(e) => onCategoryChange(e)}
                                                />
                                                <label htmlFor={imagItem.id}>
                                                    <img src={`${imagItem.image}`} alt={imagItem.name}/>
                                                    {imagItem.name}
                                                    {/* <div className="ms-2 text-dark ">
                                                        <Tippy
                                                            content={<PopoverContent catName={imagItem?.name} />}
                                                            interactive={true}
                                                            appendTo={document.body}
                                                            animation="perspective"
                                                            theme="light-border"
                                                            reference={tippyRef}
                                                        >
                                                            <span ref={tippyRef}><Icon icon="charm:info" color="#adb4c2"
                                                                width="15" height="15" /></span>
                                                        </Tippy>
                                                    </div> */}
                                                </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                            )
                        })
                    }
                </Fragment>
            )
        })
    }

    const handleUrlInput = (e) => {
        e.preventDefault();
        console.log();
        let name = e.target.name,
            value = e.target.value;

        console.log('name', name);
        console.log('value', value);
        setObservationData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        setOldCategory(auth?.categoryList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updatedCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oldCategory])

    useEffect(() => {
        let prevCategory = ObservationData.data[observationImages?.selected_image_index]?.category_map?.category || [];
        setSelectedCategory((prevCategory))
    }, [ObservationData.data, observationImages?.selected_image_index])

    useEffect(() => {
        if (observationImages?.selected_image_index === []) {
            setSelectedCategory([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observationImages?.selected_image_index])

    useEffect(() => {
        if (obvType?.image_type === 3) {
            observationImages?.data?.map((item, index) => {
                return item.category_map.category = selectedCategory
            })
        } else {
            ObservationData.data[observationImages?.selected_image_index].category_map.category = selectedCategory;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    return (
        <>
            {error && errorData?.map((item, index) => {
                if (observationSteps?.selected_image_index === index) {
                    return (
                        <span key={index} className="text-danger small">{item?.category}</span>
                    )
                }
                return true;
            })}
            <FormGroup className="mb-1">
                <p className="fw-bold">
                    What do you see in the image? (Please choose all that applies)
                    <span className="required">Required</span>
                </p>
            </FormGroup>
            <Row>
                {showCategory()}
            </Row>
            <Row>
                <Col sm={12}>
                    <FormGroup className="mb-1 mt-3">
                        <Label htmlFor="media_file_url" className="fw-bold">
                            Do you have more images or video files from the event? If yes, please enter a shareable
                            media file link (Dropbox, Google Drive, OneDrive)
                        </Label>
                        <input value={observationData?.media_file_url} id="media_file_url" name="media_file_url"
                               onChange={(e) => handleUrlInput(e)} type="text"
                               className="form-control" placeholder="eg: https://spritacular.org"/>
                    </FormGroup>
                </Col>
            </Row>
        </>
    )


}

export default ObservationCategory;