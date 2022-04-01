import { Row, Col } from 'reactstrap';
import ObservationCard from '../Shared/ObservationCard';
import Images from '../../static/images';

const HomeObservationCard = () => {
    const observationCards=[
        {
            img: "image",
            image: Images.card1,
            obs_date:"17 June 2022",
            obs_time: "5:23:00",
            imageFormat: Images.Sprite,
            username:"John Doe",
            user_profile: "imagepath",
            location: "Trieben, AT",
            country_code: 'US'
        },
        {
            img: "image",
            image: Images.card2,
            obs_date:"17 June 2022",
            obs_time: "5:23:00",
            imageFormat: Images.Sprite,
            username:"Emily White",
            user_profile: "imagepath",
            location: "Trieben, AT",
            country_code: 'US'
        },
        {
            img: "image",
            image: Images.card3,
            obs_date:"17 June 2022",
            obs_time: "5:23:00",
            imageFormat: Images.Bluejet,
            username:"Jane Ford",
            user_profile: "imagepath",
            location: "Trieben, AT",
            country_code: 'US'
        },
        {
            img: "image",
            image: Images.card4,
            obs_date:"17 June 2022",
            obs_time: "5:23:00",
            imageFormat: Images.GiganticJet,
            username:"Alex Smith",
            user_profile: "imagepath",
            location: "Trieben, AT",
            country_code: 'US'
        },
    ]
    return (
        <>
            <Row>
                {observationCards && observationCards?.map((cardItems, index)=>{
                return (
                    <Col key={index} xs={6} lg={3} className="mb-3 mb-lg-0">
                        <ObservationCard cardData={cardItems}  />
                    </Col>
                );})}
            </Row>
        </>
    )
}

export default HomeObservationCard;