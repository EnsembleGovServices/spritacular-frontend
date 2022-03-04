import { Outlet } from "react-router-dom";
import {createContext, useMemo, useState} from "react";

export const ObservationContext = createContext({});

const Observations = () => {
    const [observationSteps, setObservationSteps] = useState({
        total: 3,
        active: 1
    });

    const [observationImages, setObservationImages] = useState([]);

    return(
        <ObservationContext.Provider value={useMemo(()=> ({observationSteps, setObservationSteps, observationImages, setObservationImages}), [observationSteps, setObservationSteps, observationImages, setObservationImages])}>
            <Outlet />
        </ObservationContext.Provider>
    )
}

export default Observations;