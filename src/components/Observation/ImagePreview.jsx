import { Button } from "reactstrap";
import { Icon } from "@iconify/react";
import useObservations from "../../hooks/useObservations";
import LazyLoad from "../Upload/LazyLoad";

const removeImage = (e) => {
    console.log(e.target);
}

const ImagePreview = (props) =>{
    const {remove}=props;
    const {observationImages, observationSteps} = useObservations();
    return (
        <>
            {observationImages?.data?.filter(item => item?.id === observationSteps?.selected_image_id).map((item, index) => {
                return(
                    <div key={index} className="upload-multiple-observation">
                        <div className="observation-image position-relative">
                            <button type="button" className="bg-transparent text-black border-0 shadow-none p-0 position-absolute top-0">
                                <Icon icon="ci:close-big" className="bg-white" />
                            </button>
                            <LazyLoad src={item?.image} alt={item?.name} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ImagePreview;