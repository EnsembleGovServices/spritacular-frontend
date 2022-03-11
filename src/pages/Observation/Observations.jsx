import { Outlet } from "react-router-dom";
import {createContext, useEffect, useMemo, useState} from "react";

export const ObservationContext = createContext({});

const Observations = () => {
    const [observationType, setObservationType] = useState({
        image_type: 1
    });
    const [observationSteps, setObservationSteps] = useState({
        total: 3,
        active: 1
    });
    const [observationImages, setObservationImages] = useState([]);
    const [observationCategory, setObservationCategory] = useState([]);
    const [observationData, setObservationData] = useState([]);

    useEffect(()=> {
        setObservationData({
            isDraft: observationSteps?.is_draft ? 1 : 0,
            image_type: observationType?.image_type,
            map_data: {
                ...observationImages?.data,
                category_map: observationCategory,
            }
        })
    }, [observationCategory, observationImages?.data, observationSteps?.is_draft, observationType?.image_type])

    return(
        <ObservationContext.Provider value={
            useMemo(()=> (
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
                    setObservationData
                }
            ), [
                        observationType,
                        observationSteps,
                        observationImages,
                        observationCategory,
                        observationData
                    ]
            )}>
            <Outlet />
        </ObservationContext.Provider>
    )
}

export default Observations;