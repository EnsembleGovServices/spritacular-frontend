import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";
import DeleteBlogTutorial from "../BlogTutorial/DeleteBlogTutorial";

const BlogAction = ({item, type}) => {
    return (
        <div className="d-flex align-items-center justify-content-start">
            <Link className="me-2 btn btn-sm btn-success text-white px-4"
                  to={`${routeUrls.dashboard}/${type}/${item?.slug}`}>view</Link>

            <Link className="btn btn-sm btn-dark px-4"
                  to={`${routeUrls.dashboard}/${type}/${item?.slug}/edit`}>Edit</Link>

            <div className="ms-2">
                <DeleteBlogTutorial type={type} slug={item?.slug}/>
            </div>

        </div>
    )
}

export default BlogAction;