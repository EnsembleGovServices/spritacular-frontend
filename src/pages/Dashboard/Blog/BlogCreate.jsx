import "../../../assets/scss/component/blog.scss"
import {Col, Container, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import axios from "../../../api/axios";
import {baseURL} from "../../../helpers/url";
import {useState} from "react";

import useAuth from "../../../hooks/useAuth";
import useObservationsData from "../../../hooks/useObservationsData";

const BlogCreate = () => {
    const {auth} = useAuth();
    const {setBlog} = useObservationsData();
    const [data, setData] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

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
        
        console.log('data', data);
        await axios.post(baseURL.create_blog, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            console.log('response', response);
            setSuccess({
                status: response.status,
                message: response.data.success
            });
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
                        <h2 className="text-center">Create Article</h2>
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


                                    {/*<FormGroup>*/}
                                    {/*    <Label for="category">*/}
                                    {/*        Category*/}
                                    {/*    </Label>*/}
                                    {/*    <Input*/}
                                    {/*        id="category"*/}
                                    {/*        type="select"*/}
                                    {/*        name="category"*/}
                                    {/*        required*/}
                                    {/*        onChange={(e) => handleInput(e)}*/}
                                    {/*    >*/}
                                    {/*        <option value="first">First</option>*/}
                                    {/*        <option value="second">Second</option>*/}
                                    {/*        <option value="third">Third</option>*/}
                                    {/*    </Input>*/}
                                    {/*</FormGroup>*/}

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
                                        <Input
                                            id="content"
                                            type="textarea"
                                            rows={7}
                                            name="content"
                                            placeholder="Write content"
                                            autoComplete="off"
                                            required
                                            onChange={(e) => handleInput(e)}
                                        />
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