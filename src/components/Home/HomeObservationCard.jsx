import { Row, Col } from 'reactstrap';
import ObservationCard from '../Shared/ObservationCard';
import Images from '../../static/images';
import useObservationsData from "../../hooks/useObservationsData";

const HomeObservationCard = () => {
    const { recentObservation } = useObservationsData();
    return (
        <>
            <Row>
                {recentObservation?.latest_observation?.filter((item, index) => index < 4)?.map((cardItems, index)=>{
                    return (
                        <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                            <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index} userProfile={cardItems.user_data} homepage={true} />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default HomeObservationCard;