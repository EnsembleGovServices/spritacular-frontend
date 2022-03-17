import useObservations from "../../hooks/useObservations";
import {useEffect, useLayoutEffect, useState} from "react";
import LazyLoad from "../Upload/LazyLoad";

const ObservationUploadedImg = (props) => {
    const {step, error}=props;
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
                    <div key={index} className={`mb-2 selected-image bg-warning ${activeTab === item?.id ? 'active-tab' : ''}`} onClick={()=> toggleTab(item?.id,index)}>
                        <LazyLoad src={item?.image} alt={item?.name} />
                    </div>
                )
            })}
        </>
    )
}
export default ObservationUploadedImg;