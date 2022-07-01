import "../../assets/scss/component/tutorialdetail.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import ContentEditor from "../Blog/ContentEditor";
import useAuth from "../../hooks/useAuth";
import Loader from "../Shared/Loader";

const DynamicPageEditor = ({ title, pageContent }) => {
    const [loading, setLoading] = useState(false);

    const [isReadOnly, setReadOnly] = useState(true);
    const [data, setData] = useState({
        content: "",
    });
    const { auth } = useAuth();
    const admin = auth?.user?.is_superuser;

    console.log(isReadOnly);

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                content: pageContent
            }
        })
    }, [isReadOnly])

    return (
        <div className="blog_page">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="mb-4 mt-3 d-flex align-items-center justify-content-between">
                        <h2 className="mb-0 mx-auto">{title}</h2>
                        {admin &&
                            <button className="btn btn-primary px-4 btn-sm" onClick={() => setReadOnly(!isReadOnly)} >
                                {isReadOnly ? 'Edit' : 'Update'}
                            </button>
                        }
                    </div>
                    <Row>
                        <Col md={12}>
                            <Card className="card border-0 shadow-sm">
                                <CardBody className="p-md-5 p-4">
                                    {isReadOnly ? <ContentEditor data={pageContent} readOnly={isReadOnly} /> :
                                        <ContentEditor
                                            setLoading={setLoading}
                                            editorData={data}
                                            setData={setData}
                                            data={pageContent}
                                            readOnly={isReadOnly}
                                        />}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            {loading &&
                <Loader fixContent={true} />
            }
        </div>
    )
}

export default DynamicPageEditor;
