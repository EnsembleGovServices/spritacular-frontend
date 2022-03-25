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
                            {/* {observationImages?.observation_count > 1 && */}
                                <button type="button" className="text-black border-0 rounded-0 shadow-none p-0 position-absolute btn" ref={imageDelete} onClick={()=> remove(item?.id)}>
                                <span>
                                    <Icon icon="ci:close-big" />
                                </span>
                                </button>
                            {/* } */}
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