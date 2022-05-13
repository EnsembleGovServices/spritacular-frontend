import {Col, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import Loader from "../../../components/Shared/Loader";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import {useState, Suspense, lazy, useEffect,} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ContentEditor = lazy(() => import('../../../components/Blog/ContentEditor'))
const UploadFeaturedImage = lazy(() => import('../../../components/Blog/UploadFeaturedImage'))
const BlogType = lazy(() => import('../Blog/BlogType'))
const BlogCategory = lazy(() => import('../../../components/Blog/BlogCategory'))

const CreateUpdateBlogTutorial = (props) => {
    const {type} = props;
    const {auth} = useAuth();

    const [data, setData] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [progress, setProgress] = useState("0");

    const [inputChange, setInputChange] = useState();

    const formData = new FormData();

    const navigate = useNavigate();
    const location = useLocation();

    const getBlogCategory = async (e) => {
        return await axios.get(baseURL.blog_category, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setCategory(response.data);
        }).catch(error => {
            console.log('error', error)
        })
    };

    const handleDisable = () => {
        return !(data?.thumbnail_image !== undefined && data?.title && data?.description && (data?.article_type === 1 ? data?.category : true));
    }

    const handleInput = (e) => {
        setInputChange(e.target.value);
        setError('');
        setSuccess('');
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    }

    const crateArticle = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        let imageID = JSON.stringify(data?.image_ids);

        formData.append("thumbnail_image", data?.thumbnail_image);
        formData.append("article_type", data?.article_type);
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("content", data?.content);
        formData.append("image_ids", imageID)
        formData.append("category", data?.category);

        await axios.post(baseURL.create_blog, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
            onUploadProgress: (ProgressEvent) => {
                let progressBar = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%";
                setProgress(progressBar);
            },
        }).then(response => {
            setLoading(false);
            setSuccess({
                status: response.status,
                message: response.data.success
            });
            window.scrollTo(0, 0);
            setTimeout(function () {
                if (data?.article_type === "1") {
                    navigate('/dashboard/blog', {replace: true});
                } else {
                    navigate('/dashboard/tutorial', {replace: true});
                }
            }, 1000)
        }).catch(error => {
            setLoading(false);
            // console.log('error', error);
            // setData('')
            setError({
                status: error.response.status,
                message: error.response.data
            })
        })
    }

    useEffect(() => {
        getBlogCategory().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (location.pathname === "/dashboard/blog/create") {
            setData((prev) => {
                return {
                    ...prev,
                    category: "1",
                    article_type: "1"
                }
            })
        } else if (location.pathname === "/dashboard/tutorial/create") {
            setData((prev) => {
                return {
                    ...prev,
                    category: null,
                    article_type: "2"
                }
            })
        }
    }, [location])

    useEffect(() => {
        if (inputChange) {
            if (data && data?.article_type === "1") {
                console.log('condition', data?.article_type)
                navigate(`/dashboard/blog/${routeUrls.dashBlog.create}`, {replace: true})
            } else if (data && data?.article_type === "2") {
                console.log('condition', data?.article_type)
                navigate(`/dashboard/tutorial/${routeUrls.dashTutorial.create}`, {replace: true})
            }
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputChange, data?.article_type])

    return (
        <>
            <div className="position-relative">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0 text-capitalize">Create {type}</h2>
                    <Link to={`/${routeUrls.dashboard}/${type}`}
                          className="btn btn-primary px-4 text-capitalize">{type} lists</Link>
                </div>
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
                {error &&
                    <div className="row">
                        <Col sm={12}>
                            <UncontrolledAlert color="danger">
                                {error?.message.detail}
                            </UncontrolledAlert>
                        </Col>
                    </div>
                }
                <div className="row position-relative">
                    <Col sm={12} md={8} className="mb-4 mb-md-0">
                        <div className="row g-4">
                            <Col sm={12} md={data?.article_type === "1" ? 6 : 12}>
                                <BlogType blogType={data?.article_type} handleInput={handleInput}
                                          category={category}/>
                            </Col>
                            {data?.article_type === "1" &&
                                <Col sm={12} md={6}>
                                    <BlogCategory handleInput={handleInput} category={category}/>
                                </Col>
                            }
                        </div>
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
                                <ContentEditor setLoading={setLoading}
                                               editorData={data}
                                               setData={setData}
                                />
                            </Suspense>
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                        <Suspense fallback={<div>Please wait...</div>}>
                            <UploadFeaturedImage uploadProgress={progress}
                                                 handleInput={handleInput}
                                                 error={error}
                                                 setData={setData}/>
                        </Suspense>
                    </Col>
                    <Col sm={12}>
                        <div className="mt-4">
                            <button type="submit"
                                    disabled={handleDisable()}
                                    className={`btn px-4 py-2 px-sm-5 py-sm-2 ${handleDisable() ? 'btn-light text-light-dark' : 'btn-primary'}`}>Create
                            </button>
                            <button type="reset"
                                    className="btn btn-dark px-4 py-2 px-sm-5 py-sm-2 ms-2">Reset
                            </button>
                        </div>
                    </Col>
                    {loading &&
                        <Loader fixContent={true}/>
                    }
                </div>
            </Form>
        </>
    )
}

export default CreateUpdateBlogTutorial;