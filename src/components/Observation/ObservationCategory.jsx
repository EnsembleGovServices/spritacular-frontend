import { CategoryList } from "../../helpers/observation";
import {Col, FormGroup,PopoverBody, PopoverHeader,UncontrolledPopover, Collapse, Button} from "reactstrap";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";
import { array } from "prop-types";

import ImageCarousel from "../../components/Shared/ImageCarousel";
import { Icon } from "@iconify/react";
const ObservationCategory = () => {
    const { observationImages,setObservationImages, setObservationCategory,observationData } = useObservations();
    const [Category] = useState(CategoryList);
    const [isChecked, setIsChecked] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('' || []);
    const [popoverOpen, setPopoverOpen] = useState(null);

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
        let ObservationData = {...observationImages};
        ObservationData.data[observationImages?.selected_image_index].category_map.category =  selectedCategory;        
        setObservationImages(ObservationData);
    }
    
    
    useEffect(()=> {
        setObservationCategory((prev) => {
            return {
                ...prev,
                category: selectedCategory
            }
        })
    }, [selectedCategory, setObservationCategory])

    
    const PopoverContent = ({ contentUpdate, popoverId }) => {

        const [isPopoverContentOpen, setIsPopoverContentOpen] = useState(false);
        
        return (
          <>
            <PopoverHeader>What is sprite? 
                <Button className="bg-transparent p-0 border-0 text-black shadow-none" onClick={()=>setPopoverOpen(false)}><Icon icon="codicon:chrome-close" width="15" height="15" /></Button>
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
                <Button id={`popover${index}`} type="button" onClick={()=>toggle(index)} className="bg-transparent p-0 border-0 shadow-none">
                    <Icon icon="charm:info" color="#adb4c2" width="15" height="15" />
                </Button>
                <UncontrolledPopover
                    trigger="click"
                    target={`popover${index}`}
                    placement="top"
                    toggle={()=>toggle(index)}
                    isOpen={popoverOpen === index ? true : false}
                >
                    {({ contentUpdate, popoverId }) => (
                        <PopoverContent contentUpdate={contentUpdate} popoverId={`popover${index}`} />
                    )}
                </UncontrolledPopover>
            </div>
        )
    }
    const toggle = (index) =>{
        if(popoverOpen === index){
            console.log("if popover", popoverOpen, index);
        }else{
            setPopoverOpen(index);
            console.log("else popover", popoverOpen);
        }
    }

    useEffect(()=> {
        let checked = {};
        let selectedCategory = observationImages?.data[observationImages?.selected_image_index]?.category_map?.category;
        
        if(selectedCategory && selectedCategory.length > 0){
            selectedCategory.map((id)=> {
                checked[id] = true;
            });
        }
        console.log(checked,'hihihih');
        setIsChecked(checked);
    }, [selectedCategory])

    return(
        observationImages?.data?.filter((item) => item.id === observationImages?.selected_image_id).map((item, index) => {
            return(
                Category?.map((imagItem, index)=>{
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
                                            checked={!!isChecked[imagItem.id]}
                                            hidden
                                            onChange={(e) => onCategoryChange(e)}
                                        />
                                        <label htmlFor={imagItem.id}>
                                            <img src={imagItem.image} alt={imagItem.name} />
                                            {imagItem.name}
                                            <ImagePopover />
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>
                    )
                })
            )
        })
    )
}

export default ObservationCategory;