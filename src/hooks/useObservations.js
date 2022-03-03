import {useContext, useDebugValue} from "react";
import {ObservationContext} from "../pages/Observation/Observations";

const useObservations = () => {
    const { observationSteps, observationImages } = useContext(ObservationContext);
    // useDebugValue(observationSteps, observationSteps => observationSteps ? 'Steps set' : "Steps not set")
    useDebugValue(observationImages, observationImages => observationImages?.length ? 'Images set' : "Images not set")
    return useContext(ObservationContext);
}

export default useObservations;