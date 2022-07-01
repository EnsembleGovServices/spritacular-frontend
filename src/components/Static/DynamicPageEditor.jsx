import "../../assets/scss/component/tutorialdetail.scss";

import {lazy, Suspense} from "react";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";

const ContentEditor = lazy(() => import('../Blog/ContentEditor'))

const DynamicPageEditor = ({title, pageContent}) => {
    const [loading, setLoading] = useState(false);

    const [readOnly, setReadOnly] = useState(true);
    const [data, setData] = useState({
        content: "",
    });
    const {auth} = useAuth();
    const admin = auth?.user?.is_superuser;

    const handleEditMode = () => {
        setReadOnly(!readOnly);
    }


    const getPolicyData = async () => {
        return await axios.get(baseURL.static_policy_api, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response?.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getPolicyData().then(r => r)
    }, [])

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                content: pageContent
            }
        })
    }, [readOnly])

    return (
        <div className="blog_page">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="mb-4 mt-3 d-flex align-items-center justify-content-between">
                        <h2 className="mb-0 mx-auto">{title}</h2>
                        {admin &&
                            <button className="btn btn-primary px-4 btn-sm" onClick={() => handleEditMode()}>
                                Edit
                            </button>
                        }
                    </div>
                    <Suspense fallback=''>
                        <Row>
                            <Col md={12}>
                                <Card className="card border-0 shadow-sm">
                                    <CardBody className="p-md-5 p-4">
                                        <ContentEditor
                                            setLoading={setLoading}
                                            editorData={data}
                                            setData={setData}
                                            data={pageContent}
                                            dynamicPageProps={readOnly}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Suspense>
                </Container>
            </section>
            {loading &&
                <Loader fixContent={true}/>
            }
        </div>
    )
}

export default DynamicPageEditor;
