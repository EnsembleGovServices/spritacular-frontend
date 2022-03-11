import { Row, Col } from 'reactstrap';
import ObservationCard from '../Shared/ObservationCard';
import Images from '../../static/images';

const HomeObservationCard = () => {
    const observationCards=[
        {
            img: "image",
            imgCategory: Images.card1,
            date:"17 June 2022",
            time: "5:23:00",
            imageFormat: Images.Sprite,
            username:"John Doe",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: Images.Flag
        },
        {
            img: "image",
            imgCategory: Images.card2,
            date:"17 June 2022",
            time: "5:23:00",
            imageFormat: Images.Sprite,
            username:"Emily White",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: Images.Flag
        },
        {
            img: "image",
            imgCategory: Images.card3,
            date:"17 June 2022",
            time: "5:23:00",
            imageFormat: Images.Bluejet,
            username:"Jane Ford",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: Images.Flag
        },
        {
            img: "image",
            imgCategory: Images.card4,
            date:"17 June 2022",
            time: "5:23:00",
            imageFormat: Images.GiganticJet,
            username:"Alex Smith",
            userProfile: "imagepath",
            userCountryName: "Trieben, AT",
            userCountryIcon: Images.Flag
        },
    ]
    return (
        <>
            <Row>
                {observationCards && observationCards?.map((cardItems, index)=>{
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