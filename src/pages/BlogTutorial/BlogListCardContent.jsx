import {Link} from "react-router-dom";
import BlurImage from "../../components/Common/BlurImage";
import {useState} from "react";

const BlogListCardContent = (props) => {
    const {item, large} = props;
    const [loaderLoading, setLoaderLoading] = useState(true);

    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    };

    return (
        <div className="card h-100">
            <div className="card-body">
                <div className="dash-inner-card-list">
                    <BlurImage
                        loaderLoading={handleLoaderLoading}
                        image={item?.thumbnail_image}
                        preview={item?.thumbnail_image}
                        alt={item?.title}
                    />
                    <p className="badge-category">{item?.category_name}</p>
                </div>
                {!loaderLoading &&
                    <div className="content pt-3">
                        <h5 className="card-title">
                            <Link
                                to={`${item?.slug ? item?.slug : ""}`}
                                className={`${large ? "main-blog" : "blog-small"} d-block stretched-link`}
                            >
                                {item?.title?.length > 55 ? item?.title?.substring(0, 55) + "..." : item?.title}
                            </Link>
                        </h5>
                        <p className="mb-0">{item?.description?.length > 70 ? item?.description?.substring(0, 70) + "..." : item?.description}</p>
                    </div>
                }
            </div>
        </div>
    );
};
export default BlogListCardContent;
