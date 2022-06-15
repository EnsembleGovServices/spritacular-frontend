import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { routeUrls } from "../../../helpers/url";

import NotFound from "../../../components/Common/NotFound";
import ListContent from "./ListContent";
import Loader from "../../../components/Shared/Loader";

const ListBlogTutorial = (props) => {
    const { content, type, isLoading } = props;
    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <Container>
                        <div className="position-relative">
                            <div className="d-flex align-items-center justify-content-between">
                                <h2 className="mb-0 text-capitalize">Manage {type}</h2>
                                <Link
                                    to={`/${routeUrls.dashboard}/${type}/create`}
                                    className="btn btn-primary px-4 text-capitalize">Create {type}</Link>
                            </div>
                        </div>

                        <div className="mt-5">
                            {
                                content?.length > 0 ? (
                                    <div className="row">
                                        <ListContent item={content} type={type} />
                                    </div>
                                ) : isLoading ? (
                                    <Loader loaderClass="h-100 position-relative" />
                                ) : <NotFound />
                            }


                        </div>

                    </Container>
                </section>
            </div>
        </>
    )
}
export default ListBlogTutorial;