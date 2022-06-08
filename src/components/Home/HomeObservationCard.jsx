import {Row, Col} from 'reactstrap';
import ObservationCard from "../Shared/ObservationCard";


const HomeObservationCard = (props) => {
    const {recent} = props;
    return (
        <Row>
            {recent?.latest_observation?.map((cardItems, index) => {
                return (
                    <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                        <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index}
                                         userProfile={cardItems.user_data} homepage={true}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}

export default HomeObservationCard;