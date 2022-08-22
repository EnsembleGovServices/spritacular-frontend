import "../../../assets/scss/component/blog.scss"
import axios from "../../../api/axios";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {baseURL, routeUrls} from "../../../helpers/url";
import {Col, Form, FormGroup, Input, Label, Row, UncontrolledAlert} from "reactstrap";
import Loader from "../../../components/Shared/Loader";
import useAuth from "../../../hooks/useAuth";
import {useLayoutEffect, useState, Suspense, lazy,} from "react";

const TeamContentEditor = lazy(() => import('./TeamContentEditor'))
const UploadFeaturedImage = lazy(() => import('../../../components/Blog/UploadFeaturedImage'))


const CreateUpdateTeam = (props) => {
    const {type, update} = props;
    const {auth} = useAuth();
    const {id} = useParams();
    const initialState = {
        title: "",
        url: "",
        organization: "",
        role: "",
        content: "",
        thumbnail_image: undefined
    }
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [progress, setProgress] = useState("0");
    const [inputChange, setInputChange] = useState();
    const formData = new FormData();
    const navigate = useNavigate();
    const location = useLocation();

    const handleDisable = () => {
        return !(data?.thumbnail_image !== undefined && data?.title && data?.url && data?.organization && data.role && data.content && data.thumbnail_image);
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

    const apiContentUrl = update ? `${baseURL.team_update}${id}/` : baseURL.team_add;

    const createOrUpdateTeam = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        formData.append("thumbnail_image", data?.thumbnail_image);
        formData.append("title", data?.title);
        formData.append("organization", data?.organization);
        formData.append("role", data?.role);
        formData.append("url", data?.url);
        formData.append("content", data?.content);

        if (!update) {
            return await axios.post(apiContentUrl, formData, {
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
                    navigate('/dashboard/team', {replace: true});
                }, 1000)
            }).catch(error => {
                setLoading(false);
                setError({
                    status: error.response.status,
                    message: error.response.data
                })
            })
        } else {
            return await axios.put(apiContentUrl, formData, {
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
                    navigate('/dashboard/team', {replace: true});
                }, 1000)
            }).catch(error => {
                setLoading(false);
                setError({
                    status: error.response.status,
                    message: error.response.data
                })
            })
        }
    }

    const handleReset = () => {
        setData(initialState)
    }
    const updateTeam = async () => {

        await axios.get(`${baseURL.team_view}${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            let data = response?.data;
            setData((prev) => {
                return {
                    ...prev,
                    ...data
                }
            })
        }).catch(error => {
            if (error?.response?.statusCode !== 200) {
                navigate('/404', {replace: true});
            }
        })
    }


    useLayoutEffect(() => {
        if (update) {
            updateTeam().then(r => r);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

    return (
        <div className="create-update-team">
            <div className="position-relative">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0 text-capitalize">{update ? "Update" : "Create"} {type}</h2>
                    <Link to={`${routeUrls.dashboard}/${type}`}
                          className="btn btn-primary px-4 text-capitalize">{type} lists</Link>
                </div>
            </div>

            <Form onSubmit={createOrUpdateTeam} className="py-3 card py-4 px-4 py-md-5 px-md-5 shadow border-0 mt-5">
                {success &&
                    <div className="row">
                        <Col sm={12}>
                            <UncontrolledAlert color="success" className="text-capitalize">
                                {`success`}
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
                        <Row>
                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <Label for="title">
                                        Name
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        name="title"
                                        placeholder="Enter name"
                                        autoComplete="off"
                                        value={data ? data?.title : ""}
                                        required
                                        onChange={(e) => handleInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <Label for="organization">
                                        Organization
                                    </Label>
                                    <Input
                                        id="organization"
                                        type="text"
                                        name="organization"
                                        placeholder="Enter organization name"
                                        autoComplete="off"
                                        value={data ? data?.organization : ""}
                                        required
                                        onChange={(e) => handleInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <Label for="role">
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        type="text"
                                        name="role"
                                        placeholder="Enter role"
                                        autoComplete="off"
                                        value={data ? data?.role : ""}
                                        required
                                        onChange={(e) => handleInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <Label for="url">
                                        URL
                                    </Label>
                                    <Input
                                        id="url"
                                        type="text"
                                        name="url"
                                        placeholder="Enter URL"
                                        autoComplete="off"
                                        value={data ? data?.url : ""}
                                        required
                                        onChange={(e) => handleInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="content">
                                Content
                            </Label>
                            <Suspense fallback={<div>Please wait...</div>}>
                                <TeamContentEditor setLoading={setLoading}
                                                   editorData={data}
                                                   setData={setData}
                                                   data={data?.content}
                                />
                            </Suspense>
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={4}>
                        <Suspense fallback={<div>Please wait...</div>}>
                            <UploadFeaturedImage uploadProgress={progress}
                                                 handleInput={handleInput}
                                                 error={error}
                                                 setData={setData}
                                                 updata={update}
                                                 thumb={data?.thumbnail_image}
                            />
                        </Suspense>
                    </Col>
                    <Col sm={12}>
                        <div className="mt-4">
                            <button type="submit"
                                    disabled={handleDisable()}
                                    className={`btn px-4 py-2 px-sm-5 py-sm-2 ${handleDisable() ? 'btn-light text-light-dark' : 'btn-primary'}`}>
                                {update ? "Update" : "Create"}
                            </button>
                            <button type="button" onClick={() => handleReset()}
                                    className="btn btn-dark px-4 py-2 px-sm-5 py-sm-2 ms-2">Reset
                            </button>
                        </div>
                    </Col>
                    {loading &&
                        <Loader fixContent={true}/>
                    }
                </div>
            </Form>
        </div>
    )
}
export default CreateUpdateTeam;