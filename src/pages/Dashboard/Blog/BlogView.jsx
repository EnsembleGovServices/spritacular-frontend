import "../../../assets/scss/component/blog.scss";
import {Col, Container} from "reactstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {baseURL, routeUrls} from "../../../helpers/url";
import axios from "../../../api/axios";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import ContentEditor from "../../../components/Blog/ContentEditor";

const BlogView = () => {
    const {id} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [article, setArticle] = useState();

    const getArticleDetails = async () => {

        await axios.get(`${baseURL.get_single_blog}${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            // console.log(response);
            setArticle(response?.data?.data);
        }).catch(error => {
            // console.log(error);
            if (error?.response?.statusCode !== 200) {
                navigate('/404', {replace: true});
            }
        })
    }

    useEffect(() => {
        getArticleDetails().then(r => r)
    }, [])

    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="position-relative">
                        <h2 className="text-start">{article?.title}</h2>
                        <Link to={'/' + routeUrls.dashboard + '/' + routeUrls.dashBlog.list}
                              className="btn btn-primary px-4 listing-btn">Blog lists</Link>
                    </div>

                    <div className="mt-5">
                        <div className="row">
                            <Col sm={12}>
                                <div className="card">
                                    <div className="card-body p-4 py-md-5 px-md-5">
                                        <span className="text-light-dark">Description</span>
                                        <p className="card-text">
                                            {article?.description}
                                        </p>
                                        <div>
                                            <ContentEditor data={article?.content} readMode={true}/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </div>

                </Container>
            </section>
        </div>
    )
}

export default BlogView;