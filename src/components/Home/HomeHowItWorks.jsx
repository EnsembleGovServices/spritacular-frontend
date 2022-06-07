import "../../assets/scss/component/observationCard.scss";
import { Container, Row, Col, Button } from "reactstrap";
import Images from "../../static/images";
import { Link } from "react-router-dom";
import { routeUrls } from "../../helpers/url";
import BlurImage from "../Common/BlurImage";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const skeleton_num = { position: 'absolute', inset: '-8px 0 0 -6px' }
const skeleton_title = { position: 'absolute', inset: '-8px 0 0 62px' }

const HomeHowItWorks = () => {
    const [loaderLoading, setLoaderLoading] = useState(true);

    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    }

    return (
        <>
            <div className="how-it-works-section">
                <div className="top-polygone">
                    <img src={Images.GetStartedTopImage} alt="" />
                </div>
                <div className="bottom-polygone">
                    <img src={Images.Bottompolygon} alt="" />
                </div>
                <Container>
                    <h2>Get Started</h2>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    {loaderLoading &&
                                        <div style={skeleton_num}>
                                            <Skeleton circle height={55} width={55} />
                                        </div>
                                    }
                                    {loaderLoading &&
                                        <div style={skeleton_title}>
                                            <Skeleton height={52} width={`${"Register".length * 4}%`} />
                                        </div>
                                    }
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <h3><span>1</span>Register</h3>
                                    </span>
                                </div>
                                <p>Create an account to become a Spritacular Citizen Scientist.</p>
                                <div className="register-polygon">
                                    <img src={Images.Registerpolygon} alt="" />
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <BlurImage image={Images.Register} preview={Images.Register} loaderLoading={handleLoaderLoading} alt="Register/SignUp demo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap order-2 order-md-1 position-relative  ">
                            <BlurImage className="w-100" image={Images.HowitworksSecond} preview={Images.HowitworksSecond} loaderLoading={handleLoaderLoading} alt="How it works under Register" />
                        </Col>
                        <Col sm={6} xs={12} className="works-gap order-1 order-md-2 position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    {loaderLoading &&
                                        <div style={skeleton_num}>
                                            <Skeleton circle height={55} width={55} />
                                        </div>
                                    }
                                    {loaderLoading &&
                                        <div style={skeleton_title}>
                                            <Skeleton height={52} width={`${"Learn & Observe".length * 4}%`} />
                                        </div>
                                    }
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <h3><span>2</span>Learn & Observe</h3>
                                    </span>
                                </div>
                                <p>
                                    Complete the observation tutorial before starting to observe a
                                    sprite. This is intended to make sure your observation inline
                                    with our standards.
                                </p>
                                <Link to={`/${routeUrls.tutorials}`} className="view-tutorial">View Tutorial</Link>
                                <div className="observe-polygon">
                                    <img src={Images.Observepolygon} alt="" className="w-100" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={12} className="works-gap position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    {loaderLoading &&
                                        <div style={skeleton_num}>
                                            <Skeleton circle height={55} width={55} />
                                        </div>
                                    }
                                    {loaderLoading &&
                                        <div style={skeleton_title}>
                                            <Skeleton height={52} width={`${"Share".length * 4}%`} />
                                        </div>
                                    }
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <h3><span>3</span>Share</h3>
                                    </span>
                                </div>
                                <p>Upload your observation images and choose the appropriate
                                    observation category(sprite, elve, gigantic jet, blue jet, or
                                    other). You need to complete other details as well such as
                                    location, date, time, and your camera details.
                                </p>
                                <div className="share-polygon">
                                    <img src={Images.Sharepolygon} alt="" />
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap position-relative">
                            <div className="shadow-lg shadow-sm p-3 bg-white rounded">
                                <BlurImage image={Images.Dragdrop} preview={Images.Dragdrop} loaderLoading={handleLoaderLoading} alt="Share" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} xs={12} className="works-gap order-2 order-md-1 position-relative">
                            <div className="shadow-lg shadow-sm p-3 bg-white rounded">
                                <BlurImage image={Images.Jet} preview={Images.Jet} loaderLoading={handleLoaderLoading} alt="Jet" />
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="works-gap order-1 order-md-2 position-relative">
                            <div className="how-it-work-text-info">
                                <div className="position-relative">
                                    {loaderLoading &&
                                        <div style={skeleton_num}>
                                            <Skeleton circle height={55} width={55} />
                                        </div>
                                    }
                                    {loaderLoading &&
                                        <div style={skeleton_title}>
                                            <Skeleton height={52} width={`${"Engage".length * 4}%`} />
                                        </div>
                                    }
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <h3><span>4</span>Engage</h3>
                                    </span>
                                </div>
                                <p>
                                    Review and left comment on other citizen scientist
                                    observations.
                                </p>
                                <div className="engage-polygon">
                                    <img src={Images.Engagepolygon} alt="Share" />
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
