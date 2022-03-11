import { Button } from "reactstrap";
import { Icon } from "@iconify/react";
import useObservations from "../../hooks/useObservations";
import LazyLoad from "../Upload/LazyLoad";

const ImagePreview = () =>{
    const {observationImages, observationSteps} = useObservations();
    return (
        <>
            {observationImages?.data?.filter(item => item?.id === observationSteps?.selected_image_id).map((item, index) => {
                return(
                    <div key={index} className="upload-multiple-observation">
                        <div className="observation-image position-relative">
                            <Button className="bg-transparent text-black border-0 shadow-none p-0 position-absolute">
                                <Icon icon="ci:close-big" className="bg-white" />
                            </Button>
                            <LazyLoad src={item?.image} alt={item?.name} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ImagePreview;