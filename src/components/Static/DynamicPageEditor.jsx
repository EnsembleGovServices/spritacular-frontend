import "../../assets/scss/component/tutorialdetail.scss";

import {lazy, Suspense} from "react";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader";
import axios from "../../api/axios";
import NotFound from "../Common/NotFound";

const ContentEditor = lazy(() => import('../Blog/ContentEditor'))

const DynamicPageEditor = ({title, endpoint}) => {
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [data, setData] = useState({title: title, content: ''});
    const {auth} = useAuth();
    const formData = new FormData();
    const admin = auth?.user?.is_superuser;

    // Toggle Edit/Update button
    const handleEditMode = () => {
        setNoData(false);
        setReadOnly(!readOnly);
    }

    // Get dynamic data from db
    const getDynamicData = async () => {
        setLoading(true)
        if (readOnly) {
            return await axios.get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response?.data?.content) {
                        setNoData(true);
                    } else {
                        setNoData(false);
                    }
                    setData((prev) => {
                        return {
                            ...prev,
                            title: response?.data?.title,
                            content: response?.data?.content
                        }
                    });
                    setTimeout(() => {
                        setLoading(false)
                    }, 600)
                })
                .catch((error) => {
                    setLoading(false)
                })
        } else {
            return false;
        }
    }

    // Update change data to db and page
    const updateData = async (e) => {
        setLoading(true);
        e.preventDefault();
        setReadOnly(!readOnly);
        formData.append("title", title);
        formData.append("content", data?.content);
        if (admin && !readOnly) {
            return await axios.post(endpoint, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token?.access}`,
                },
            }).then((response) => {
                setLoading(false);
                setData((prev) => {
                    return {
                        ...prev,
                        title: title,
                        content: response?.content
                    }
                });

            }).catch((error) => {
                process.env.NODE_ENV === "development" && console.log('Update DynamicPage:', error)
                setLoading(false);
            })
        }
    }

    // Call getDynamicData function on component mount
    useEffect(() => {
        getDynamicData().then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Store data in state on refresh or update
    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                content: data?.content
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <div className="blog_page">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="mb-4 mt-3 d-flex align-items-center justify-content-between">
                        <h2 className="mb-0 mx-auto">{title}</h2>
                        {admin && readOnly &&
                            <button className="btn btn-primary px-4 btn-sm" onClick={() => handleEditMode()}>
                                {noData ? 'Add Data' : 'Edit'}
                            </button>
                        }
                        {admin && !readOnly &&
                            <button className="btn btn-primary px-4 btn-sm" onClick={(e) => updateData(e)}>
                                Update
                            </button>
                        }
                    </div>
                    {data?.content?.length > 1 &&
                        <Suspense fallback=''>
                            <Row>
                                <Col md={12}>
                                    <Card className="card border-0 shadow-sm">
                                        <CardBody className="p-md-5 p-4">
                                            {noData && <NotFound/>}
                                            <div className="form-group">
                                                {!readOnly &&
                                                    <label htmlFor="content" className="col-form-label">Content</label>
                                                }
                                                <ContentEditor
                                                    setLoading={setLoading}
                                                    editorData={data?.content}
                                                    data={data?.content}
                                                    setData={setData}
                                                    dynamicPageProps={readOnly}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Suspense>
                    }
                </Container>
            </section>
            {loading &&
                <Loader fixContent={true}/>
            }
        </div>
    )
}

export default DynamicPageEditor;
