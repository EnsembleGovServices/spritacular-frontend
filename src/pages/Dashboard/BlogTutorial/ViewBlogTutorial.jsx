import {Col, Container} from "reactstrap";
import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";
import {Icon} from "@iconify/react/dist/iconify";
import ContentEditor from "../../../components/Blog/ContentEditor";

const ViewBlogTutorial = (props) => {
    const {slug, content, setReadMode, readMode, type} = props;
    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <Container>
                        <div className="position-relative">
                            <div className="">
                                <Link to={'/' + routeUrls.dashboard + '/' + type}
                                      className="d-flex align-items-center justify-content-start mb-3">
                                    <Icon icon="ep:back"/>
                                    <span className="ms-2">
                                    Back to {type}
                                </span>
                                </Link>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">{content?.title}</h2>
                                    <Link
                                        to={content ? `/${routeUrls.dashboard}/${type}/${slug}/edit` : ''}
                                        className="btn btn-primary px-4 btn-sm">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <Col sm={12}>
                                    <div className="card">
                                        <div className="card-body p-4 py-md-5 px-md-5">
                                            <span className="text-light-dark">Description</span>
                                            <p className="card-text">
                                                {content?.description}
                                            </p>
                                            <div>
                                                <ContentEditor data={content?.content}
                                                               setReadMode={setReadMode}
                                                               readMode={readMode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>

                    </Container>
                </section>
            </div>
        </>
    )
}
export default ViewBlogTutorial;