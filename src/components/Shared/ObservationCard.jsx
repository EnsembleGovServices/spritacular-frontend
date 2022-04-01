import "../../assets/scss/component/observationCard.scss";
import Images from "../../static/images";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Badge, CardFooter, Button } from "reactstrap";
import moment from "moment";
import { Icon } from "@iconify/react";
import ReactCountryFlags from "../ReactCountryFlag";
import { getdirectionDegree } from "../../helpers/observation";
import CardImageCarousel from "./CardImageCarousel";

const ObservationCard = (props) => {
    const { cardItems, handleClick, userProfile, cardData, index, activeType } = props;
    return (
        <>
            <Card className="observation_card overflow-hidden">
                <div
                    className="text-black card-link d-inline-block shadow-none bg-transparent rounded-0 border-0 p-0 text-start"
                    onClick={(e) => {
                        userProfile && handleClick(index);
                    }}
                >
                    {!userProfile && (
                        <div className="observation_country">
                            <Badge className="bg-black text-white">
                                <ReactCountryFlags country={cardData?.country_code} />
                                {cardData?.location}
                            </Badge>
                        </div>
                    )}
                    {userProfile && cardItems?.image_type === 3 && (
                        <div className="multiple-image_icon">
                            <Icon icon="codicon:list-filter" color="black" />
                        </div>
                    )}
                    {userProfile && activeType === "draft" && (
                        <Button className="multiple-image_icon border-0 edit-icon">
                            <Icon icon="eva:edit-2-outline" />
                        </Button>
                    )}
                    {cardItems?.is_verified && (
                        <div className="verify-card">
                            <Icon icon="mdi:check-decagram" color="#27ae60" width="13" height="13" />
                        </div>
                    )}
                    { !(cardItems?.image_type === 3) &&<img 
                        alt="Card cap"  
                        src={cardData?.image} 
                        className="img-fluid card-img" 
                        onClick={(e) => {
                            userProfile && handleClick(index);
                        }}
                    />}
                    {userProfile && cardItems?.image_type === 3 && <CardImageCarousel carouselData={cardItems?.images} />}
                    <CardBody className="position-relative observation-card_body">
                        <div className="position-absolute observation_type d-flex align-items-center">
                            {cardItems?.category_data.length > 0 &&
                                cardItems?.category_data.map((item, index) => {
                                    let image = `/assets/images/category/${item?.toLowerCase().replaceAll(" ", "")}.png`;
                                    return (
                                        <i className="rounded-circle bg-white me-1" key={index}>
                                            <img src={image} alt={item} className="rounded-circle" />
                                        </i>
                                    );
                                })}
                        </div>
                        <Row className="card-details">
                            <Col xs={6} lg={6} className="">
                                <div className="card_desc">
                                    <CardTitle className="font-bold">
                                        {cardData?.obs_date_time_as_per_utc ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY") : cardData?.obs_date ? cardData?.obs_date : null}
                                    </CardTitle>
                                    <CardSubtitle>
                                        {cardData?.obs_date_time_as_per_utc ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A") : cardData?.obs_time ? cardData?.obs_time : null}{" "}
                                        <Badge className="bg-black text-white p-1">{cardData?.obs_date_time_as_per_utc ? "UTC" : cardData?.obs_time ? "UTC" : ""}</Badge>
                                    </CardSubtitle>
                                </div>
                            </Col>
                            <Col xs={6} lg={6} className=" justify-content-end d-flex">
                                <div className="d-flex card-user_details align-items-center overflow-hidden">
                                    <h6 className="pe-2 mb-0 text-truncate">{userProfile ? userProfile?.first_name + " " + userProfile?.last_name : cardData.username}</h6>
                                    <i className="profile-icon rounded-circle">
                                        <img src={userProfile ? userProfile?.profile_image : Images.Profile} width="100%" height="100%" alt="Profile" className="rounded-circle" />
                                    </i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>

                    {userProfile && (
                        <CardFooter>
                            <Row>
                                <Col xs={6} lg={8}>
                                    <h6 className="mb-0">{cardData?.location}</h6>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <div className="card-user_location" style={{ "--card-location-angle": `${getdirectionDegree(cardData?.azimuth)}deg` }}>
                                        <h6 className="me-1 mb-0">
                                            {cardData?.azimuth}
                                            {Number(cardData?.azimuth) ? "°" : ""}
                                        </h6>
                                        {cardData?.azimuth && 
                                        <span className="card-direction rounded-circle position-relative d-flex justify-content-center align-items-start">
                                            <span className="direction-dot"/>
                                        </span>}
                                    </div>
                                </Col>
                            </Row>
                        </CardFooter>
                    )}
                </div>
            </Card>
        </>
    );
};

export default ObservationCard;
