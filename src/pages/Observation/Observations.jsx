import { Outlet } from "react-router-dom";
import {createContext, useState} from "react";

export const ObservationContext = createContext({});

const Observations = () => {
    const [observationSteps, setObservationSteps] = useState({
        total: 3,
        active: 1
    });

    const [observationImages, setObservationImages] = useState([]);

    return(
        <ObservationContext.Provider value={{observationSteps, setObservationSteps, observationImages, setObservationImages}}>
            <Outlet />
        </ObservationContext.Provider>
    )
}

export default Observations;