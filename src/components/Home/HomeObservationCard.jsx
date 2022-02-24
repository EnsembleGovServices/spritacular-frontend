import { Row, Col } from 'reactstrap';
import ObservationCard from '../shared/ObservationCard';

const HomeObservationCard = () => {
    const observationCards=[
        {
            img: "image",
            imgCategory: "imagepath",
            date:"17 June 2022",
            time: "5:23:00",
            username:"John Doe",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: "imagepath"
        },
        {
            img: "image",
            imgCategory: "imagepath",
            date:"17 June 2022",
            time: "5:23:00",
            username:"John Doe",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: "imagepath"
        },
        {
            img: "image",
            imgCategory: "imagepath",
            date:"17 June 2022",
            time: "5:23:00",
            username:"John Doe",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: "imagepath"
        },
        {
            img: "image",
            imgCategory: "imagepath",
            date:"17 June 2022",
            time: "5:23:00",
            username:"John Doe",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: "imagepath"
        },
    ]
    return (
        <>
            <Row>
                {observationCards && observationCards.map((cardItems, index)=>{
                return (
                    <Col key={index} className="col-6 col-md-3 mb-3 mb-md-0">
                        <ObservationCard cardItems={cardItems} />
                    </Col>
                );})}
            </Row>
        </>
    )
}

export default HomeObservationCard;