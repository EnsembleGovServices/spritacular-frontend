import {useContext, useDebugValue} from "react";
import {ObservationContext} from "../pages/Observation/Observations";

const useObservations = () => {
    const { observationSteps, observationImages } = useContext(ObservationContext);
    useDebugValue(observationSteps, observationSteps => observationSteps ? 'Observation steps set' : "Observation steps not set")
    useDebugValue(observationImages, observationImages => observationImages ? 'Observation images set' : "Observation images not set")
    return useContext(ObservationContext);
}

export default useObservations;