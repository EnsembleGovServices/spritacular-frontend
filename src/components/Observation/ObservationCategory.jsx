import { CategoryList } from "../../helpers/observation";
import {Col, FormGroup} from "reactstrap";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";

const ObservationCategory = () => {
    const { observationImages, setObservationCategory } = useObservations();
    const [Category] = useState(CategoryList);
    const [isChecked, setIsChecked] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('' || []);


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
    }
    
    useEffect(()=> {
        setObservationCategory((prev) => {
            return {
                ...prev,
                category: selectedCategory
            }
        })
    }, [selectedCategory, setObservationCategory])


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