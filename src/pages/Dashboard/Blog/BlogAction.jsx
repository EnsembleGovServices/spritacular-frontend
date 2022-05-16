import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";

const BlogAction = ({item, type}) => {
    return (
        <div>
            <Link className="me-2 btn btn-sm btn-primary px-4"
                  to={'/' + routeUrls.dashboard + '/' + type + '/' + item?.slug}>view</Link>
            <Link
                className="btn btn-sm btn-dark px-4"
                to={`/${routeUrls.dashboard}/${type}/${item?.slug}/edit`}>edit</Link>
        </div>
    )
}

export default BlogAction;