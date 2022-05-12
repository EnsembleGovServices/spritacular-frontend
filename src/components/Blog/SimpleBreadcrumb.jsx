import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";
import {routeUrls} from "../../helpers/url";

const SimpleBreadcrumb = (props) => {
    const {page, title} = props;
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <Link to={'/' + routeUrls.home}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to={`/${page?.toLowerCase()}`} className="text-capitalize"> {page ? page : ''} </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                {title ? title : ''}
            </BreadcrumbItem>
        </Breadcrumb>
    )
}
export default SimpleBreadcrumb;