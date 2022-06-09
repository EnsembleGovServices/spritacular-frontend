import {Link} from "react-router-dom";
import BlurImage from "../../components/Common/BlurImage";
import {useState} from "react";

const TutorialListCardContent = (props) => {
    const {item} = props;
    const [loaderLoading, setLoaderLoading] = useState(true);
    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    };

    return (
        <Link
            to={`${item?.slug ? item?.slug : ""}`}
            className={`d-block position-relative card-body p-0`}
        >
            <div className="tutorial-img">
                <BlurImage
                    loaderLoading={handleLoaderLoading}
                    image={item?.thumbnail_image}
                    preview={item?.thumbnail_image}
                    alt={item?.title}
                />
            </div>
            {!loaderLoading && (
                <>
                    <h3>{item?.title?.length > 50 ? item?.title?.substring(0, 50) + '...' : item?.title}</h3>
                    {/*<p>{item?.description?.length > 90 ? item?.description?.substring(0, 90) + '...' : item?.description}</p>*/}
                </>
            )}
        </Link>
    );
};
export default TutorialListCardContent;
