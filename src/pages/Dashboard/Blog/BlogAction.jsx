import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";

const BlogAction = ({item}) => {
    return (
        <div>
            <Link className="me-2"
                  to={'/' + routeUrls.dashboard + '/' + routeUrls.dashBlog.list + '/' + item?.slug}>view</Link>
            <Link
                to={`/${routeUrls.dashboard}/${routeUrls.dashBlog.list}/${item?.slug}/edit`}>edit</Link>
        </div>
    )
}

export default BlogAction;