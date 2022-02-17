import Images from "../../static/images";
import { Card, CardBody, CardTitle, CardImg, CardSubtitle, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import "../../assets/scss/component/observationCard.scss";

const ObservationCard = (props) => {
    const {cardItems} = props;
    return(
        <>
            <Card className="observation_card overflow-hidden">
                <Link to="" className="text-black card-link">
                    <div className="observation_country">
                        <Badge className="bg-black text-white">
                            <img src={Images.Flag} alt="Flag" className="mr-1" /> {cardItems.userCountryName}
                        </Badge>
                    </div>
                    <CardImg
                    alt="Card image cap"
                    src={Images.card1}
                    top
                    width="100%"
                    />
                    <CardBody className="position-relative observation-card_body">
                        <i className="position-absolute observation_type rounded-circle"><img src={Images.Sprite} alt="Sprite" className="rounded-circle" /></i>
                        <Row className="card-details">
                            <Col className="col-12 col-lg-6">
                                <div className="card_desc">
                                    <CardTitle className="font-bold">{cardItems.date}</CardTitle>
                                    <CardSubtitle>{cardItems.time} <Badge className="bg-black text-white p-1">UTC</Badge></CardSubtitle>
                                </div>
                            </Col>
                            <Col className="col-12 col-lg-6 justify-content-end d-flex" >
                                <div className="d-flex card-user_details align-items-center overflow-hidden">
                                    <h6 className="me-2 mb-0 text-truncate">{cardItems.username}</h6>
                                    <i className="profile-icon rounded-circle"><img src={Images.Profile} alt="Profile" className="rounded-circle" /></i>
                                    {/* User sort name  */}
                                    {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Link>
            </Card>
        </>
    )
}

export default ObservationCard;