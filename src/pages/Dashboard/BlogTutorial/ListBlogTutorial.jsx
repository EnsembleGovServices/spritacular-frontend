import BlogAction from "../Blog/BlogAction";
import {Col, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";
import NotFound from "../../../components/Common/NotFound";

const ListBlogTutorial = (props) => {
    const {content, thead, type} = props;
    const ListThead = () => {
        return thead?.map((item, index) => {
            return <th key={index}>{item?.name}</th>
        })
    }
    const ListContent = () => {
        return content?.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        {item?.id}
                    </th>
                    <td>
                        {item?.title.substring(0, 40) + '...'}
                    </td>
                    <td>
                        {item?.description.substring(0, 80) + '...'}
                    </td>

                    <td>
                        <BlogAction item={item}/>
                    </td>
                </tr>
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
                            <div className="row">
                                <Col sm={12}>
                                    <div className="card">
                                        <div className="card-body  p-4 py-md-5 px-md-5">
                                            {content?.length > 0 ? (
                                                <Table className="mb-0 table table-borderless table-hover table-striped"
                                                >
                                                    <thead className="border-b">
                                                    <tr>
                                                        {ListThead()}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {ListContent()}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <NotFound/>
                                            )
                                            }
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
export default ListBlogTutorial;