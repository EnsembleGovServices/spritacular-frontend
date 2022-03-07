import useObservations from "../../hooks/useObservations";
import {useLayoutEffect, useState} from "react";
import LazyLoad from "../Upload/LazyLoad";

const ObservationUploadedImg = () => {
    const {observationImages, setObservationImages} = useObservations();
    const [preview, setPreview] = useState([]);
    const [activeTab, setActiveTab] = useState(observationImages?.selected ?? null);

    // Toggle Tabs
    const toggleTab = (tab) => {
        setActiveTab(tab);
        setObservationImages(prev => {
            return {
                ...prev,
                selected: tab
            }
        });
    };
    
    useLayoutEffect(()=> {
        setPreview(observationImages?.images);
        setActiveTab(activeTab);
    }, [activeTab, observationImages, preview])


    return(
        <>
            {preview?.map((item, index) => {
                return(
                    <div key={index} className="mb-2" onClick={()=> toggleTab(item?.id)}>
                        <LazyLoad src={item?.image} alt={item?.name} />
                    </div>
                )
            })}
        </>
    )
}
export default ObservationUploadedImg;