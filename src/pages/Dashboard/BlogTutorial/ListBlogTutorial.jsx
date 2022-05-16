import BlogAction from "../Blog/BlogAction";
import {Col, Container} from "reactstrap";
import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";
import NotFound from "../../../components/Common/NotFound";
import BlurImage from "../../../components/Common/BlurImage";

const ListBlogTutorial = (props) => {
    const {content, type} = props;

    const ListContent = () => {
        return content?.map((item, index) => {
            return (
                <Col sm={12} md={4} xl={3} className="mb-4">
                    <div key={index} className="card h-100">
                        <div className="card-body">
                            <div className="dash-inner-card-list">
                                <BlurImage preview={item?.thumbnail_image} image={item?.thumbnail_image}
                                           alt={item?.title}/>
                            </div>
                            <div>
                                {item?.title.substring(0, 40) + '...'}
                            </div>
                            <div>
                                {item?.description.substring(0, 80) + '...'}
                            </div>
                        </div>
                        <div className="card-footer">
                            <div>
                                <BlogAction type={type} item={item}/>
                            </div>
                        </div>
                    </div>
                </Col>
            )
        })
    }
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
                            {content?.length > 0 ? (
                                <div className="row">
                                    {ListContent()}
                                </div>
                            ) : (
                                <NotFound/>
                            )
                            }
                        </div>

                    </Container>
                </section>
            </div>
        </>
    )
}
export default ListBlogTutorial;