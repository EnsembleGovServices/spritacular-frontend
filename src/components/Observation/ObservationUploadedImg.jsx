import useObservations from "../../hooks/useObservations";
import {useLayoutEffect, useState} from "react";
import LazyLoad from "../Upload/LazyLoad";

const ObservationUploadedImg = () => {
    const {observationImages} = useObservations();
    const [preview, setPreview] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    // Toggle Tabs
    const toggleTab = (tab) => {
        setActiveTab(tab);
    };
    
    useLayoutEffect(()=> {
        setPreview(observationImages);
        setActiveTab(activeTab)
    }, [observationImages, preview])


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