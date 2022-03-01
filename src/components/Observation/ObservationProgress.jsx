import {useEffect, useState} from "react";

const ObservationProgress = (props) => {
    const {step} = props;
    const [percentage, setPercentage] = useState(100);


    useEffect(()=> {
        setPercentage(
            step?.active * 100 / step?.total
        )
    }, [step])

    return(
        <>
            {step?.active} of {step?.total} steps
            <p>{percentage}%</p>
        </>
    )
}
export default ObservationProgress;