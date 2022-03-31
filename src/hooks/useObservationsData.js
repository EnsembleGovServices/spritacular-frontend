import {useContext, useDebugValue} from "react";
import {observationViewContext} from "../layouts/PersistLogin";

const useObservationsData = () => {
    const { observationListData } = useContext(observationViewContext);
    useDebugValue(observationListData, observationListData => observationListData ? 'List data set' : "Listing data not set")
    return useContext(observationViewContext);
}

export default useObservationsData;