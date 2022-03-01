import {useContext, useDebugValue} from "react";
import {ObservationContext} from "../pages/Observation/Observations";

const useObservations = () => {
    const { observationSteps } = useContext(ObservationContext);
    useDebugValue(observationSteps, observationSteps => observationSteps ? 'Observation steps set' : "Observation steps not set")
    return useContext(ObservationContext);
}

export default useObservations;