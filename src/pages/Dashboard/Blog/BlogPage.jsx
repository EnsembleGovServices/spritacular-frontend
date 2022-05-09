import "../../../assets/scss/component/blog.scss"
import {Col, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";

import {baseURL, routeUrls} from "../../../helpers/url";
import axios from "../../../api/axios";
import BlogAction from "./BlogAction";
import NotFound from "../../../components/Common/NotFound";

const BlogPage = () => {
    const {auth} = useAuth();
    const [articles, setArticles] = useState();

    const getArticle = async () => {
        await axios.get(baseURL.get_blog, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            // console.log('response', response);
            setArticles(response?.data?.data);
        }).catch(error => {
            console.log('error', error)
        })
    }


    const listArticles = () => {
        return articles?.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        {item?.id}
                    </th>
                    <td>
                        {item?.title.substring(0, 30) + '...'}
                    </td>
                    <td>
                        {item?.description.substring(0, 90) + '...'}
                    </td>

                    <td>
                        <BlogAction item={item}/>
                    </td>
                </tr>
            )
        })
    }


    useEffect(() => {
        getArticle().then(r => r)
    }, [])

    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="position-relative">
                        <h2 className="text-center">Blog Articles</h2>
                        <Link
                            to={'/' + routeUrls.dashboard + '/' + routeUrls.dashBlog.list + '/' + routeUrls.dashBlog.create}
                            className="btn btn-primary px-4 listing-btn">Create Article</Link>
                    </div>

                    <div className="mt-5">
                        <div className="row">
                            <Col sm={12}>
                                <div className="card">
                                    <div className="card-body  p-4 py-md-5 px-md-5">
                                        {articles?.length > 0 ? (
                                            <Table className="mb-0 table table-borderless"
                                            >
                                                <thead>
                                                <tr>
                                                    <th>
                                                        ID
                                                    </th>
                                                    <th>
                                                        Title
                                                    </th>
                                                    <th>
                                                        Description
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {listArticles()}
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
    )
}

export default BlogPage;