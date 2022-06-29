import "../../../assets/scss/component/tutorialdetail.scss";
import {Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import useAuth from "../../../hooks/useAuth";
import SimpleBreadcrumb from "../../../components/Blog/SimpleBreadcrumb";
import ContentEditor from "../../../components/Blog/ContentEditor";

const BlogArticleDetails = () => {
    const [article, setArticle] = useState();
    const {slug} = useParams();
    const {auth} = useAuth();
    const admin = auth?.user?.is_superuser;


    const getArticle = async () => {
        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setArticle(response?.data?.data);
        }).catch(error => {
            process.env.NODE_ENV === "development" && console.log('BlogArt: ', error)
        })
    }

    useEffect(() => {
        getArticle().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="tutorial-details_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-detail-main">
                    <Container>
                        <div className="breadcrumb-main">
                            <SimpleBreadcrumb page="Blog" title={article?.title.split(" ").length > 6 ? `${article?.title.split(" ", 6).join(" ")}...` : article?.title}/>
                        </div>
                        <div className="mb-4 mt-3 d-flex align-items-center justify-content-between">
                            <h2 className="mb-0">{article?.title}</h2>
                            {admin &&
                                <Link
                                    to={article ? `/${routeUrls.dashboard}/${routeUrls.dashBlog.list}/${slug}/edit` : ''}
                                    className="btn btn-primary px-4 btn-sm">
                                    Edit
                                </Link>
                            }
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-5">
                                        <ContentEditor data={article?.content} readOnly={true}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default BlogArticleDetails;