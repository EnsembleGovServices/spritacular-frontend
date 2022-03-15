import Images from "../../static/images";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Badge, CardFooter, Button } from "reactstrap";
import "../../assets/scss/component/observationCard.scss";
import { Icon } from '@iconify/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ObservationCard = (props) => {
    const {cardItems, handleClick,userProfile} = props;
    
    return(
        <>
            <Card className="observation_card overflow-hidden">
                <Button className="text-black card-link d-inline-block shadow-none bg-transparent rounded-0 border-0 p-0 text-start" onClick={handleClick} >
                    <div className="observation_country">
                        <Badge className="bg-black text-white">
                            <img src={cardItems.userCountryIcon} alt="Flag" className="me-1" /> {cardItems.userCountryName}
                        </Badge>
                    </div>
                    <div className="varify-card"><Icon icon="mdi:check-decagram" color="#27ae60" width="13" height="13" /></div>
                        <LazyLoadImage alt="Card cap" src={cardItems.image} delayTime="1000" effect="blur" className="img-fluid card-img" />
                    <CardBody className="position-relative observation-card_body">
                        <i className="position-absolute observation_type rounded-circle bg-white"><img src={userProfile?.profile_image} alt="Sprite" className="rounded-circle" /></i>
                        <Row className="card-details">
                            <Col className="col-12 col-lg-6">
                                <div className="card_desc">
                                    <CardTitle className="font-bold">{cardItems.obs_date}</CardTitle> 
                                    <CardSubtitle>{cardItems.obs_time} <Badge className="bg-black text-white p-1">UTC</Badge></CardSubtitle>
                                </div>
                            </Col>
                            <Col className="col-12 col-lg-6 justify-content-end d-flex" >
                                <div className="d-flex card-user_details align-items-center overflow-hidden">
                                    <h6 className="pe-2 mb-0 text-truncate">{userProfile?.first_name + ' ' + userProfile?.last_name}</h6>
                                    <i className="profile-icon rounded-circle"><img src={userProfile?.profile_image} alt="Profile" className="rounded-circle" /></i>
                                    {/* User sort name  */}
                                    {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col sm={6}>
                                <h6 className="mb-0">cardItems.location</h6>
                            </Col>
                            <Col sm={6}>
                                <div className="card-user_location" style={{"--card-location-angle": '0deg'}}>
                                    <h6 className="me-1 mb-0">cardItems.azimuth</h6>
                                    <span className="card-direction rounded-circle position-relative d-inline-block"></span>
                                </div>
                            </Col>
                        </Row>
                    </CardFooter>
                </Button>
            </Card>
        </>
    )
}

export default ObservationCard;