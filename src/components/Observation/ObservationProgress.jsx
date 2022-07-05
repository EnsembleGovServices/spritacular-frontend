import {useEffect, useState} from "react";
import "../../assets/scss/component/ObservationProgress.scss";

const ObservationProgress = (props) => {
    const {step} = props;
    const [progress, setProgress] = useState(100);

    useEffect(()=> {
        setProgress(
            step?.active * 100 / step?.total
        )
    }, [step])

    return(
        <>
            <div className="progress_bar text-black">
                {step?.active} of {step?.total} steps
                <p className="progress_line" style={{ "--progressPercentage": progress + '%' }} ></p>
            </div>
        </>
    )
}
export default ObservationProgress;