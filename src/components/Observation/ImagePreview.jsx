import { Icon } from "@iconify/react";
import useObservations from "../../hooks/useObservations";
import LazyLoad from "../Upload/LazyLoad";
import {useRef} from "react";
import PropTypes from "prop-types";


const ImagePreview = (props) =>{
    const {remove}=props;
    const imageDelete = useRef(null);
    const {observationImages, observationSteps} = useObservations();

    return (
        <>
            {observationImages?.data?.filter(item => item?.id === observationSteps?.selected_image_id).map((item, index) => {
                return(
                    <div key={index} className="upload-multiple-observation">
                        <div className="observation-image position-relative">
                            <button type="button" className="bg-transparent text-black border-0 shadow-none p-0 position-absolute top-0" ref={imageDelete} onClick={()=> remove(item?.id)}>
                                <span>
                                    <Icon icon="ci:close-big" className="bg-white" />
                                </span>
                            </button>
                            <LazyLoad src={item?.image} alt={item?.name} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}
ImagePreview.propTypes = {
    remove: PropTypes.func,
};
export default ImagePreview;