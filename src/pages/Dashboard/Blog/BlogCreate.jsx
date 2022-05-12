import "../../../assets/scss/component/blog.scss"
import {Col, Container, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import {useState, Suspense, lazy,} from "react";
import {Link, useNavigate} from "react-router-dom";

import useAuth from "../../../hooks/useAuth";


const ContentEditor = lazy(() => import('../../../components/Blog/ContentEditor'))
const UploadFeaturedImage = lazy(() => import('../../../components/Blog/UploadFeaturedImage'))

const BlogCreate = () => {
    const {auth} = useAuth();
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
            [name]: value,
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
            setTimeout(function () {
                navigate('/dashboard/blog', {replace: true});
            }, 1000)
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

                        <Form className="py-3 card py-4 px-4 py-md-5 px-md-5 shadow border-0 mt-5"
                              onSubmit={crateArticle}>
                            {success &&
                                <div className="row">
                                    <Col sm={12}>
                                        <UncontrolledAlert color="success">
                                            {success?.message}
                                        </UncontrolledAlert>
                                    </Col>
                                </div>
                            }
                            <div className="row">
                                <Col sm={12} md={8} className="mb-4 mb-md-0">
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
                                        <Suspense fallback={<div>Please wait...</div>}>
                                            <ContentEditor editorData={data} setData={setData} readMode={false}/>
                                        </Suspense>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label for="title">
                                            Choose Category
                                        </Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            type="select"
                                            onChange={(e) => handleInput(e)}
                                        >
                                            <option value="sprite">Sprite</option>
                                            <option value="blue jet">Blue Jet</option>
                                            <option value="elve">Elve</option>
                                            <option value="gigantic jet">Gigantic Jet</option>
                                            <option value="halo">Halo</option>
                                            <option value="secondary jet">Secondary Jet</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="title">
                                            Upload Thumbnail
                                        </Label>
                                        <Suspense fallback={<div>Please wait...</div>}>
                                            <UploadFeaturedImage handleInput={handleInput} setData={setData}/>
                                        </Suspense>
                                    </FormGroup>
                                </Col>
                                <Col sm={12}>
                                    <div className="mt-4">
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