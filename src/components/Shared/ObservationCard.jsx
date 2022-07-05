import "../../assets/scss/component/observationCard.scss";
import {Card, CardBody, CardTitle, CardSubtitle, Row, Col, Badge, CardFooter, Button} from "reactstrap";
import moment from "moment";
import {Icon} from "@iconify/react";
import ReactCountryFlags from "../ReactCountryFlag";
import {getdirectionDegree} from "../../helpers/observation";
import CardImageCarousel from "./CardImageCarousel";
import Tippy from "@tippyjs/react";
import BlurImage from "../Common/BlurImage";
import Skeleton from "react-loading-skeleton";
import {useState} from "react";
import {cdn} from "../../helpers/url";

const ObservationCard = (props) => {
    const {cardItems, handleClick, userProfile, cardData, index, activeType, homepage, handleContinueEdit} = props;
    const [loaderLoading, setLoaderLoading] = useState(true);

    const handleImageClick = () => {
        return homepage ? null : userProfile && handleClick(index);
    }

    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    }

    return (
        <Card
            className={`${homepage ? 'observation_card overflow-hidden homepage_observation_card' : 'observation_card overflow-hidden'}`}>
            <div
                className="text-black card-link d-inline-block shadow-none bg-transparent rounded-0 border-0 p-0 text-start">
                {!userProfile && (
                    <div className="observation_country">
                        <Badge className="bg-black text-white">
                            <ReactCountryFlags country={cardData?.country_code}/>
                            {cardData?.location}
                        </Badge>
                    </div>
                )}
                {userProfile && cardItems?.image_type === 3 && (
                    <div className="multiple-image_icon">
                        <Icon icon="codicon:list-filter" color="black"/>
                    </div>
                )}
                {userProfile && activeType === "draft" && (
                    <Button className="multiple-image_icon border-0 edit-icon" onClick={() =>
                        handleContinueEdit({id: cardItems?.id, type: activeType})
                    }>
                        <Icon icon="eva:edit-2-outline"/>
                    </Button>
                )}
                {cardItems?.is_verified && (
                    <div className="verify-card">
                        <Icon icon="mdi:check-decagram" color="#27ae60" width="13" height="13"/>
                    </div>
                )}
                {cardItems?.image_type === 3
                    ? <CardImageCarousel carouselData={cardItems?.images} handleClick={handleClick}
                                         handleIndex={index}
                                         loaderLoading={handleLoaderLoading}
                    />
                    : <BlurImage
                        alt={userProfile?.location}
                        preview={(cardData?.compressed_image) ? cardData?.compressed_image : cardData?.image}
                        image={(cardData?.compressed_image) ? cardData?.compressed_image : cardData?.image}
                        handleClick={handleImageClick}
                        homepage={homepage}
                        loaderLoading={handleLoaderLoading}
                    >
                    </BlurImage>
                }
                <CardBody className="position-relative observation-card_body">
                    <div className="observation_type">
                        {cardItems?.category_data?.length > 0 &&
                            cardItems?.category_data?.map((item, index) => {
                                let image = `${cdn.url}/category/${item?.name?.toLowerCase().replaceAll(" ", "")}.png`;
                                return (
                                    <div className="cat-loader" key={index}>
                                        {loaderLoading &&
                                            <div className="skeleton">
                                                <Skeleton
                                                    circle
                                                    width={32}
                                                    height={32}
                                                />
                                            </div>
                                        }
                                        <div className="rounded-circle bg-white me-1">
                                            <Tippy animation="perspective" content={item?.name}>
                                                <img width={22} height={22} src={image} alt={item?.name}
                                                     className="rounded-circle"/>
                                            </Tippy>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {loaderLoading &&
                        <div className="body-loader">
                            <div className="skeleton">
                                <Skeleton count={3} height={15}/>
                            </div>
                        </div>
                    }
                    <Row className="card-details">
                        <Col xs={6} lg={6} className="">
                            <div className="card_desc">
                                <CardTitle className="font-bold">
                                    {cardData?.obs_date_time_as_per_utc ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY") : cardData?.obs_date ? cardData?.obs_date : null}
                                </CardTitle>
                                <CardSubtitle>
                                    {cardData?.obs_date_time_as_per_utc ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A") : cardData?.obs_time ? cardData?.obs_time : null}{" "}
                                    <Badge
                                        className="bg-black text-white p-1">{cardData?.obs_date_time_as_per_utc ? "UTC" : cardData?.obs_time ? "UTC" : ""}</Badge>
                                </CardSubtitle>
                            </div>
                        </Col>
                        <Col xs={6} lg={6} className=" justify-content-end d-flex">
                            <div className="d-flex card-user_details align-items-center overflow-hidden">
                                <Tippy animation="perspective"
                                       content={userProfile ? userProfile?.first_name + " " + userProfile?.last_name : cardData.username}>
                                    <div
                                        className="name pe-2 mb-0 text-truncate">{userProfile ? userProfile?.first_name + " " + userProfile?.last_name : cardData.username}</div>
                                </Tippy>
                                <div className="profile-icon rounded-circle">
                                    <img
                                        src={userProfile?.profile_image ? userProfile?.profile_image : `${cdn.url}/profile.svg`}
                                        width="30" height="30" alt="Profile" className="rounded-circle"/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>

                {userProfile && !homepage &&
                    <CardFooter className="position-relative">
                        {loaderLoading &&
                            <div className="footer-loader">
                                <div className="skeleton">
                                    <Skeleton count={1} height={22}/>
                                </div>
                            </div>
                        }
                        <div className="location-details">
                            <h6 className="mb-0">{cardData?.location}</h6>
                        </div>
                        <div className="direction-details">
                            <div className="card-user_location"
                                 style={{"--card-location-angle": `${getdirectionDegree(cardData?.azimuth)}deg`}}>
                                <h6 className="me-1 mb-0">
                                    {cardData?.azimuth}
                                    {Number(cardData?.azimuth) ? "°" : ""}
                                </h6>
                                {cardData?.azimuth &&
                                    <span
                                        className="card-direction rounded-circle position-relative d-flex justify-content-center align-items-start">
                                        <span className="direction-dot"/>
                                    </span>}
                            </div>
                        </div>
                    </CardFooter>
                }
            </div>
        </Card>
    );
};

export default ObservationCard;
