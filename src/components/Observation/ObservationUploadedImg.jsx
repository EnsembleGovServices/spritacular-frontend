import useObservations from "../../hooks/useObservations";
import {useEffect, useLayoutEffect, useState} from "react";
import LazyLoad from "../Upload/LazyLoad";

const ObservationUploadedImg = (props) => {
    const {step, error, obvType}=props;
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
                    <div className="d-flex justify-content-end" key={index}>
                        <button type="button" disabled={obvType?.image_type === 3} className={`position-relative overflow-hidden d-flex p-0 border-0 shadow-none mb-2 selected-image ${activeTab === item?.id ? 'active-tab' : ''}`} onClick={()=> toggleTab(item?.id,index)}>
                            <LazyLoad src={item?.image} alt={item?.name} />
                        </button>
                    </div>
                )
            })}
        </>
    )
}
export default ObservationUploadedImg;