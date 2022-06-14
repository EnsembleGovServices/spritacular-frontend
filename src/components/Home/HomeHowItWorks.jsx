import "../../assets/scss/component/observationCard.scss";
import { Container, Row, Col } from "reactstrap";
import Images from "../../static/images";
import { Link } from "react-router-dom";
import { routeUrls } from "../../helpers/url";
import BlurImage from "../Common/BlurImage";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

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
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>1</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55} />
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Register</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="position-relative">
                                    <p>Create an account to become a Spritacular Citizen Scientist.</p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton />
                                        </div>
                                    }
                                </div>
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
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>2</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55} />
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Learn & Observe</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className={`${loaderLoading ? 'mb-3' : ''} position-relative`}>
                                    <p>
                                        Complete the observation tutorial before starting to observe a
                                        sprite. This is intended to make sure your observation inline
                                        with our standards.
                                    </p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton />
                                        </div>
                                    }
                                </div>

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
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>3</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55} />
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Share</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="position-relative">

                                    <p>Upload your observation images and choose the appropriate
                                        observation category(sprite, elve, gigantic jet, blue jet, or
                                        other). You need to complete other details as well such as
                                        location, date, time, and your camera details.
                                    </p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton />
                                        </div>
                                    }
                                </div>
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
                                    <span className="rounded-circle bg-white cursor-pointer">
                                        <div className="h3">
                                            <div className="numb">
                                                <span>4</span>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton circle width={55} height={55} />
                                                    </div>
                                                }
                                            </div>
                                            <div className="title">
                                                <h3 className="d-block">Engage</h3>
                                                {loaderLoading &&
                                                    <div className="t-loader">
                                                        <Skeleton />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className=" position-relative">
                                    <p>
                                        Review and left comment on other citizen scientist
                                        observations.
                                    </p>
                                    {loaderLoading &&
                                        <div className="t-loader mt-3">
                                            <Skeleton />
                                        </div>
                                    }
                                </div>
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
