import "../../../assets/scss/component/tutorialdetail.scss";
import {Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../../../api/axios";
import {baseURL} from "../../../helpers/url";
import useAuth from "../../../hooks/useAuth";
import SimpleBreadcrumb from "../../../components/Blog/SimpleBreadcrumb";
import ContentEditor from "../../../components/Blog/ContentEditor";

const BlogArticleDetails = () => {
    const {auth} = useAuth();
    const [article, setArticle] = useState();
    const {id} = useParams();

    const getArticle = async () => {
        await axios.get(`${baseURL.get_single_blog}${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setArticle(response?.data?.data);
        }).catch(error => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        getArticle().then(r => r)
    }, [])

    return (
        <>
            <div className="tutorial-details_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-detail-main">
                    <Container>
                        <div className="breadcrumb-main">
                            <SimpleBreadcrumb page="Blog" title={article?.title}/>
                        </div>
                        <h2>{article?.title}</h2>
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