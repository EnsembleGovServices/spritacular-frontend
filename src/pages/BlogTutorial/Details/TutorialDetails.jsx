import "../../../assets/scss/component/tutorialdetail.scss";
import {Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import useAuth from "../../../hooks/useAuth";
import SimpleBreadcrumb from "../../../components/Blog/SimpleBreadcrumb";
import ContentEditor from "../../../components/Blog/ContentEditor";
import useObservationsData from "../../../hooks/useObservationsData";

const TutorialDetails = () => {
    // const [tutorial, setTutorial] = useState();
    const {slug} = useParams();
    const {auth} = useAuth();
    const {setATDetails, atDetails} = useObservationsData();
    const admin = auth?.user?.is_superuser;
    const tutorial = atDetails?.tutorial;


    const getTutorial = async () => {
        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setATDetails((prev) => {
                return {
                    ...prev,
                    tutorial: response?.data?.data
                }
            })
        }).catch(error => {
            process.env.NODE_ENV === "development" && console.log('GetTutorial DetailPage: ', error)
        })
    }

    useEffect(() => {
        getTutorial().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="tutorial-details_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-detail-main">
                    <Container>
                        <div className="breadcrumb-main">
                            <SimpleBreadcrumb page="Tutorials" title={tutorial?.title}/>
                        </div>
                        <div className="mb-4 mt-3 d-flex align-items-center justify-content-between">
                            <h2 className="mb-0">{tutorial?.title}</h2>
                            {admin &&
                                <Link
                                    to={tutorial ? `${routeUrls.dashboard}/${routeUrls.dashTutorial.list}/${slug}/edit` : ''}
                                    className="btn btn-primary px-4 btn-sm">
                                    Edit
                                </Link>
                            }
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-5">
                                        <span className="text-light-dark">Description</span>
                                        <p className="card-text">
                                            {tutorial?.description}
                                        </p>
                                        <ContentEditor data={tutorial?.content} readOnly={true}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default TutorialDetails;