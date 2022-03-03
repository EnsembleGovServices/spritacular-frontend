import {Container} from 'reactstrap';
import HomeObservationCard from './HomeObservationCard';
const HomeMapSection = () => {
    return(
        <>
            <div className="map_section">
                <div className="bg-black map_inner">
                    <Container>
                        <div className="position-relative">
                            <div className="obervation-card_wrapper">
                                <HomeObservationCard/>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default HomeMapSection;



