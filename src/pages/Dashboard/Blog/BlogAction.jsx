import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";

const BlogAction = ({item, type}) => {
    return (
        <div>
            <Link className="me-2"
                  to={'/' + routeUrls.dashboard + '/' + type + '/' + item?.slug}>view</Link>
            <Link
                to={`/${routeUrls.dashboard}/${type}/${item?.slug}/edit`}>edit</Link>
        </div>
    )
}

export default BlogAction;