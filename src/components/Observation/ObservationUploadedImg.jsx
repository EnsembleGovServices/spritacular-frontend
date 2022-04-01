import useObservations from "../../hooks/useObservations";
import {useLayoutEffect, useState} from "react";
import LazyLoad from "../Upload/LazyLoad";
import { Icon } from '@iconify/react';
import { PropTypes } from 'prop-types';
import ObservationUpdateUploadedImages from "./ObservationUpdateUploadedImages";

const ObservationUploadedImg = (props) => {
    const { remove, className }=props;
    const {observationImages, setObservationImages} = useObservations();
    const [preview, setPreview] = useState([]);
    const [activeTab, setActiveTab] = useState(observationImages?.selected_image_id ?? null);
    // Toggle Tabs
    const toggleTab = (tab,index=0) => {
        setActiveTab(tab);
        setObservationImages(prev => {
            return {
                ...prev,
                selected_image_id: tab,
                selected_image_index:index,

            }
        });
    };


    useLayoutEffect(()=> {
        setPreview(observationImages?.data);
        setActiveTab(activeTab);
    }, [activeTab, observationImages, preview])

    return(
        <>
            {preview?.map((item, index) => {
                return(
                    <div className={`selected-image_wrapper d-flex justify-content-end mb-2 ms-2 ms-sm-0 position-relative ${className ? className : ''}`} key={index}>
                        <div className={`selected-image  ${activeTab === item?.id ? 'active-tab' : ''}`}>
                            <button type="button" className='preview-btn position-relative d-flex p-0 shadow-none' onClick={()=> toggleTab(item?.id,index)}>
                                <LazyLoad src={item?.image} alt={item?.name} />
                            </button>
                            {/* {observationImages?.observation_count > 1 && */}
                                <ObservationUpdateUploadedImages item={item} index={index} />
                                <button type="button" className="remove-btn text-black border-0 position-absolute btn" onClick={()=> remove(item?.id)}>
                                <span>
                                    <Icon icon="ci:close-big" />
                                </span>
                                </button>
                            {/* } */}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
ObservationUploadedImg.propTypes = {
    remove: PropTypes.func
};
export default ObservationUploadedImg;