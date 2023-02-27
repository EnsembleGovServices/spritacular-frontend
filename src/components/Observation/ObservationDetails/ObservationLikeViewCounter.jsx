import {Icon} from "@iconify/react/dist/iconify";

const ObservationLikeViewCounter = (props) => {
    const {likeView, commentCount} = props;
    return (
        <div className="d-flex align-items-center justify-content-center user-review">
            <div className="d-flex align-items-center justify-content-center fw-bold me-4">
                <span className="me-2 d-flex">
                <Icon icon="heroicons-solid:thumb-up" width="17"/>
            </span>
                <span>{likeView?.like_count}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center fw-bold me-4">
                <span className="me-2 d-flex">
                <Icon icon="heroicons-solid:eye" width="17"/></span>
                <span>{likeView?.watch_count}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center fw-bold">
                <span className="me-2 d-flex">
                    <Icon icon="mdi:message" width="17"/>
                </span>
                <span>{commentCount}</span>
            </div>
        </div>
    )
}

export default ObservationLikeViewCounter;