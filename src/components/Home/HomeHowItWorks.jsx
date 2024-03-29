import "../../assets/scss/component/observationCard.scss";
import {Container, Row, Col} from "reactstrap";
import {cdn, routeUrls} from "../../helpers/url";
import BlurImage from "../Common/BlurImage";
import Skeleton from "react-loading-skeleton";
import {useState} from "react";
import {Link} from "react-router-dom";

const HomeHowItWorks = () => {
    const [loaderLoading, setLoaderLoading] = useState(true);

    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    }

    return (
        <>
            <div className="how-it-works-section">
                <div className="top-polygone">
                    <img src={`${cdn.url}/how-it-works-page.png`} alt="how it works"/>
                </div>
                <div className="bottom-polygone">
                    <img src={`${cdn.url}/bottom-polygon.png`} alt="bottom-polygon"/>
                </div>
                <Container>
                    <h2>Get Started</h2>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>1</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55}/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Register</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="position-relative">
                                    <p>Please create an account to become a part of our community.</p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton/>
                                        </div>
                                    }
                                </div>
                                <div className="register-polygon">
                                    <img src={`${cdn.url}/register-polygon.png`} alt=""/>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <BlurImage image={`${cdn.url}/Register.png`} preview={`${cdn.url}/Register.png`}
                                       loaderLoading={handleLoaderLoading} alt="Register/SignUp demo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap order-2 order-md-1 position-relative  ">
                            <BlurImage image={`${cdn.url}/Howitworks_second.png`}
                                       preview={`${cdn.url}/night_sky_new.jpg`}
                                       loaderLoading={handleLoaderLoading} alt="How it works under Register"/>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap order-1 order-md-2 position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>2</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55}/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Learn & Observe</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className={`${loaderLoading ? 'mb-3' : ''} position-relative`}>
                                    <p>
                                        Please check
                                        out our <Link
                                        to={`/${routeUrls.blog}`}>blog</Link> under the “Resources” tab.
                                        These resources are intended to improve your
                                        knowledge and help with the methods you can contribute to the project.
                                    </p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton/>
                                        </div>
                                    }
                                </div>

                                {/* <Link to={`/${routeUrls.tutorials}`} className="view-tutorial">View Tutorial</Link> */}
                                <div className="observe-polygon">
                                    <img src={`${cdn.url}/Learn-observe-polygon.png`} alt="Learn-observe-polygon"
                                         className="w-100"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={12} className="works-gap position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>3</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55}/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Share</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="position-relative">

                                    <p>Please submit your TLE observations following the steps in our observation
                                        submission system</p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton/>
                                        </div>
                                    }
                                </div>
                                <div className="share-polygon">
                                    <img src={`${cdn.url}/share-polygon.png`} alt="share-polygon"/>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <div className="shadow-lg shadow-sm p-3 bg-white rounded">
                                <BlurImage image={`${cdn.url}/drag-drop.jpg`} preview={`${cdn.url}/drag-drop.jpg`}
                                           loaderLoading={handleLoaderLoading} alt="Share"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap order-2 order-md-1 position-relative">
                            <div className="shadow-lg shadow-sm p-3 bg-white rounded">
                                <BlurImage image={`${cdn.url}/jet.jpg`} preview={`${cdn.url}/jet.jpg`}
                                           loaderLoading={handleLoaderLoading}
                                           alt="Jet"/>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap order-1 order-md-2 position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>4</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55}/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Engage</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className=" position-relative">
                                    <p>
                                        Explore our gallery of observations and engage with our community!
                                    </p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton/>
                                        </div>
                                    }
                                </div>
                                <div className="engage-polygon">
                                    <img src={`${cdn.url}/engage-polygon.png`} alt="Share"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default HomeHowItWorks;
