import {Icon} from "@iconify/react/dist/iconify";

const ObservationLikeViewCounter = (props) => {
    const {likeView, commentCount} = props;
    return (
        <div className="d-flex align-items-center justify-content-center user-review">
            <span className="me-3 d-flex" ><Icon icon="heroicons-solid:thumb-up" width="17" height="17" className="me-1" /> {likeView?.like_count} </span>
            <span className="me-3 d-flex" ><Icon icon="heroicons-solid:eye" width="17" height="17" className="me-1" /> {likeView?.watch_count} </span>
            <span className="d-flex" ><Icon icon="mdi:message" width="17" height="17" className="me-1" /> {commentCount} </span>
        </div>
    )
}

export default ObservationLikeViewCounter;