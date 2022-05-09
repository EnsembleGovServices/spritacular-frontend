import "../../../assets/scss/component/blog.scss"
import {Col, Container, Form, FormGroup, Input, Label} from "reactstrap";

const BlogCreate = () => {
    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <Container>
                        <h2 className="text-center">Create Article</h2>
                        <Form className="py-3 card p-4 py-md-5 px-md-5 shadow border-0 mt-5">
                            <div className="row">
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
                                        />
                                    </FormGroup>


                                    <FormGroup>
                                        <Label for="category">
                                            Category
                                        </Label>
                                        <Input
                                            id="category"
                                            type="select"
                                            name="category"
                                            required
                                        >
                                            <option value="first">First</option>
                                            <option value="second">Second</option>
                                            <option value="third">Third</option>
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            type="textarea"
                                            rows={10}
                                            name="description"
                                            placeholder="Write your content"
                                            autoComplete="off"
                                            required
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