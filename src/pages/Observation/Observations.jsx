import { Outlet } from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import { cameraSettingFields } from "../../helpers/url";

export const ObservationContext = createContext({});

const Observations = () => {
    const [observationType, setObservationType] = useState({
        image_type: 1
    });

    const [observationSteps, setObservationSteps] = useState({
        total: 3,
        active: 1,
        mode: {
            update: false
        }
    });
    const [observationImages, setObservationImages] = useState([]);
    const [cameraDetails, setCameraDetails] = useState(cameraSettingFields);
    const [observationCategory, setObservationCategory] = useState([]);
    const [observationData, setObservationData] = useState({});

    useEffect(()=> {
        let data = (observationImages?.data) ? [...observationImages?.data] : []
        setObservationData({
            // is_draft: observationSteps?.is_draft ? 1 : 0,
            image_type: observationType?.image_type,
            map_data: data,
            elevation_angle: null,
            video_url : ''
        })
    }, [observationImages?.data, observationSteps?.is_draft, observationType?.image_type])

    return(
        <ObservationContext.Provider value={
            {
                observationType,
                setObservationType,
                observationSteps,
                setObservationSteps,
                observationImages,
                setObservationImages,
                observationCategory,
                setObservationCategory,
                observationData,
                setObservationData,
                cameraDetails, 
                setCameraDetails
            }
        }>
            <Outlet />
        </ObservationContext.Provider>
    )
}

export default Observations;