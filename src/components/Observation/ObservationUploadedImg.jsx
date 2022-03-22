import useObservations from "../../hooks/useObservations";
import {useLayoutEffect, useState, useRef} from "react";
import LazyLoad from "../Upload/LazyLoad";
import { Icon } from '@iconify/react';
import { PropTypes } from 'prop-types';

const ObservationUploadedImg = (props) => {
    const {obvType, remove, className}=props;
    const {observationImages, setObservationImages} = useObservations();
    const [preview, setPreview] = useState([]);
    const [activeTab, setActiveTab] = useState(observationImages?.selected_image_id ?? null);
    const imageDelete = useRef(null);
    // Toggle Tabs
    const toggleTab = (tab,index=0) => {
        setActiveTab(tab);
        setObservationImages(prev => {
            return {
                ...prev,
                selected_image_id: tab,
                selected_image_index:index
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
                    <div className={`selected-image_wrapper d-flex justify-content-end mb-2 position-relative ${className ? className : ''}`} key={index}>
                        <button type="button" disabled={obvType?.image_type === 3} className={`position-relative d-flex p-0 shadow-none selected-image ${activeTab === item?.id ? 'active-tab' : ''}`} onClick={()=> toggleTab(item?.id,index)}>
                            <LazyLoad src={item?.image} alt={item?.name} />
                        </button>
                        {observationImages?.observation_count > 1 &&
                            <button type="button" className="remove-btn text-black border-0 p-0 position-absolute btn" ref={imageDelete} onClick={()=> remove(item?.id)}>
                            <span>
                                <Icon icon="ci:close-big" />
                            </span>
                            </button>
                        }
                    </div>
                )
            })}
        </>
    )
}
ObservationUploadedImg.propTypes = {
    remove: PropTypes.func,
};
export default ObservationUploadedImg;