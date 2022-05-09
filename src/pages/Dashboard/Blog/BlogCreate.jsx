import "../../../assets/scss/component/blog.scss"
import {Col, Container, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import {useState} from "react";

import useAuth from "../../../hooks/useAuth";
import useObservationsData from "../../../hooks/useObservationsData";

import ContentEditor from "../../../components/Blog/ContentEditor";
import {Link, useNavigate} from "react-router-dom";


const BlogCreate = () => {
    const {auth} = useAuth();
    const {setBlog} = useObservationsData();
    const [data, setData] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;
        setData({
            ...data,
            [name]: value
        })
    }

    const crateArticle = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        await axios.post(baseURL.create_blog, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setSuccess({
                status: response.status,
                message: response.data.success
            });
            window.scrollTo(0, 0);
            navigate('/dashboard/blog', {replace: true});
        }).catch(error => {
            console.log('error', error)
            setError({
                status: error.status,
                message: error.data
            })
        })
    }


    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <Container>
                        <div className="position-relative">
                            <h2 className="text-center">Create Article</h2>
                            <Link to={'/' + routeUrls.dashboard + '/' + routeUrls.dashBlog.list}
                                  className="btn btn-primary px-4 listing-btn">Blog lists</Link>
                        </div>

                        <Form className="py-3 card p-4 py-md-5 px-md-5 shadow border-0 mt-5" onSubmit={crateArticle}>
                            <div className="row">
                                {success &&
                                    <Col sm={12}>
                                        <UncontrolledAlert color="success">
                                            {success?.message}
                                        </UncontrolledAlert>
                                    </Col>
                                }
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label for="title">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Enter blog title"
                                            autoComplete="off"
                                            required
                                            onChange={(e) => handleInput(e)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            type="textarea"
                                            rows={2}
                                            name="description"
                                            placeholder="Write description"
                                            autoComplete="off"
                                            required
                                            onChange={(e) => handleInput(e)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="content">
                                            Content
                                        </Label>
                                        <ContentEditor setData={setData} readMode={false}/>
                                    </FormGroup>

                                    <div className="mt-4 mt-sm-5">
                                        <button type="submit"
                                                className="btn btn-primary px-4 py-2 px-sm-5 py-sm-2">Create
                                        </button>
                                        <button type="reset"
                                                className="btn btn-dark px-4 py-2 px-sm-5 py-sm-2 ms-2">Reset
                                        </button>
                                    </div>
                                </Col>
                            </div>
                        </Form>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default BlogCreate;