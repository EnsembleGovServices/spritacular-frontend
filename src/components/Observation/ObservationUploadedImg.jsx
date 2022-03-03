import useObservations from "../../hooks/useObservations";
import {useLayoutEffect, useState} from "react";

const ObservationUploadedImg = (props) => {
    const {observationImages} = useObservations();
    const [preview, setPreview] = useState([]);

    useLayoutEffect(()=> {
        setPreview(observationImages)
    }, [observationImages])

    return(
        <>
            {preview?.map((item, index) => {
                return(
                    <div key={index} className="mb-2">
                        <img
                            className="img-fluid rounded-1 shadow-sm"
                            src={item?.image}
                            alt="preview"
                        />
                    </div>
                )
            })}
        </>
    )
}
export default ObservationUploadedImg;