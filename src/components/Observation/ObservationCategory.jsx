
import {Col, FormGroup,PopoverBody, PopoverHeader,UncontrolledPopover, Collapse, Button, Row} from "reactstrap";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";
import { Icon } from "@iconify/react";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import Images from "../../static/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";


const ObservationCategory = (props) => {
    const {error, obvType}=props;
    const { auth } = useAuth();
    const { observationImages, setObservationImages, observationSteps, observationCategory , setObservationCategory } = useObservations();
    const [Category, setCategory] = useState([]);
    const [oldCategory, setOldCategory] = useState([]);
    const [isChecked, setIsChecked] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('' || []);
    const ObservationData = {...observationImages};
    const errorData = error ? Object.values(error?.data) : {};
    
    const fetchCategory = async () => {
            await axios.get(baseURL.api+'/observation/get_category_list/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                }
            })
            .then((response)=> {
                setOldCategory(response?.data);
            })
            .catch((error)=> {console.log(error)})
    }

    const onCategoryChange=(e)=>{
        const value = parseFloat(e.target.id);
        setIsChecked({...isChecked,[e.target.name]: e.target.checked});
        if(selectedCategory.includes(value))
        {
            const filterValue = selectedCategory.filter((item) => item !== value)
            setSelectedCategory(filterValue);
        }else{
            setSelectedCategory([...selectedCategory, value]);
        }
        setObservationImages(ObservationData);
    }

    const updatedCategory = () => {
        let newCategory = [];
        oldCategory?.map((item, index) => {
            let image = `/assets/images/category/${item?.name.toLowerCase().replaceAll(" ", "")}.png`

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
    const ImageCarousel = (props) =>{
        const {className} = props;
        const items= [
            { src: Images.card1 },
            { src: Images.card2 },
            { src: Images.card3 }
        ]
    
        const carouselContent = items.map((item, index) => {
            return (
                <SwiperSlide key={index}>
                    <img src={item.src} alt="carousel" />
                </SwiperSlide>
            );
        });
    
        return (
            <>
                <Swiper navigation={true} modules={[Navigation]} className={`className ${className ? className : ''}`}>
                    {carouselContent}
                </Swiper>
            </>
        )
    }
    const PopoverContent = ({ contentUpdate, popoverId }) => {

        const [isPopoverContentOpen, setIsPopoverContentOpen] = useState(false);
        
        return (
          <>
            <PopoverHeader>What is sprite? 
                {/* <Button className="bg-transparent p-0 border-0 text-black shadow-none"><Icon icon="codicon:chrome-close" width="15" height="15" /></Button> */}
            </PopoverHeader>
            <PopoverBody>
                <p style={{'--line-clamb': isPopoverContentOpen === true ? 'unset' : '2'}}>
                    Sprites or red sprites are large-scale electric discharges that occur high above thunderstorm clouds, they appear as luminous reddish-orange flashes. 
                </p>
                <Collapse
                isOpen={isPopoverContentOpen}
                onEntered={contentUpdate}
                onExited={contentUpdate}
                >
                <ImageCarousel className="popover-carousel" />
              </Collapse>
                <Button className="bg-transparent p-0 border-0 text-secondary shadow-none d-block" onClick={()=>setIsPopoverContentOpen(!isPopoverContentOpen)}>
                    {isPopoverContentOpen === true ? 'Show less' : 'Show more'}
                </Button>
            </PopoverBody>
          </>
        );
    };
    
    const ImagePopover = (props) => {
        const {index} = props;
        return(
            <div className="ms-2">
                <Button id={`popover${index}`} type="button" className="bg-transparent p-0 border-0 shadow-none d-flex">
                    <Icon icon="charm:info" color="#adb4c2" width="15" height="15" />
                </Button>
                <UncontrolledPopover
                    trigger="click"
                    target={`popover${index}`}
                    placement="top"
                >
                    {({ contentUpdate, popoverId }) => (
                        <PopoverContent contentUpdate={contentUpdate} popoverId={`popover${index}`} />
                    )}
                </UncontrolledPopover>
            </div>
        )
    }

    const showCategory = () => {
        return observationImages?.data?.filter((item) => item.id === observationImages?.selected_image_id).map((item, index) => {
            return(
                observationCategory?.data?.map((imagItem, index)=>{
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
                                            <img src={`${imagItem.image}`} alt={imagItem.name} />
                                            {imagItem.name}
                                            <ImagePopover index={imagItem.id} />
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>
                    )
                })
            )
        })
    }

    useEffect(()=> {
        fetchCategory().then(r=>r)
    }, [])

    useEffect(() => {
        updatedCategory();
    }, [oldCategory])

    useEffect(() => {
        let prevCategory = ObservationData.data[observationImages?.selected_image_index]?.category_map?.category || [];
        setSelectedCategory((prevCategory))
    }, [ObservationData.data, observationImages?.selected_image_index])

    useEffect(() => {
        if (observationImages?.selected_image_index === []) {
            setSelectedCategory([])
        }
    }, [observationImages?.selected_image_index])

    useEffect(()=> {
        if(obvType?.image_type === 3) {
            observationImages?.data?.map((item, index) => {
                return item.category_map.category = selectedCategory
            })
        } else {
            ObservationData.data[observationImages?.selected_image_index].category_map.category = selectedCategory;
        }
    },[selectedCategory])

    return(
        <>
            {error && errorData?.map((item, index) => {
                if (observationSteps?.selected_image_index === index) {
                    return(
                        <span key={index} className="text-danger small">{item?.category}</span>
                    )
                }
                return true;
            })}
            <FormGroup className="mb-1">
                <p className="fw-bold">
                    Please choose the appropriate category
                    <span className="required">Required</span>
                </p>
            </FormGroup>
            <Row>
                {showCategory()}
            </Row>
        </>
    )



}

export default ObservationCategory;