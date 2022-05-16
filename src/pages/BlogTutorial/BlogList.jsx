import "../../assets/scss/component/blog.scss";
import {Col, Container, Row} from "reactstrap"
import {useEffect, useState, lazy, Suspense} from "react";
import {baseURL, routeUrls} from "../../helpers/url";
import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader";
import {Link} from "react-router-dom";

const BlogFeatured = lazy(() => import('./Featured/BlogFeatured'))
const BlogGrid4 = lazy(() => import('./Grid/BlogGrid4'))
const BlogRestLists = lazy(() => import('./List/BlogRestLists'))


const BlogList = () => {
    const {auth} = useAuth();
    const [articles, setArticles] = useState([]);
    const admin = auth?.user?.is_superuser;


    const getArticles = async () => {
        await axios.get(`${baseURL.get_blog}1`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setArticles({
                featured: response?.data?.data[0],
                grid4: response?.data?.data?.slice(1, 5),
                list: response?.data?.data?.slice(5),
                all: response?.data?.data
            });
        }).catch(error => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        getArticles().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="mb-5 d-flex align-items-center justify-content-between">
                        <h2 className="mb-0">Spritacular Blog</h2>
                        {auth?.user && admin &&
                            <Link
                                to={'/' + routeUrls.dashboard + '/' + routeUrls.dashBlog.list + '/' + routeUrls.dashBlog.create}
                                className="btn btn-primary px-4">Create Article</Link>
                        }
                    </div>

                    <Row className="g-4">
                        <Col md={6}>
                            <Suspense fallback={<Loader fixContent={true}/>}>
                                <BlogFeatured articleItems={articles?.featured}/>
                            </Suspense>
                        </Col>
                        <Col md={6}>
                            <Suspense fallback={<Loader fixContent={true}/>}>
                                <BlogGrid4 articleItems={articles?.grid4}/>
                            </Suspense>
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <Suspense fallback={<Loader fixContent={true}/>}>
                            <BlogRestLists articleItems={articles?.list}/>
                        </Suspense>
                    </div>
                </Container>
            </section>
        </div>
    )
}
export default BlogList;