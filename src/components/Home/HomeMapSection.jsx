import {Container} from 'reactstrap';
import {cdn} from "../../helpers/url";
import HomeObservationCard from "./HomeObservationCard";

// const HomeObservationCard = lazy(() => import('./HomeObservationCard'))

const HomeMapSection = (props) => {
    const {recent} = props;
    return (
        <section className="map_section bg-black">
            <div className="map_inner">
                <img className="img-fluid" src={`${cdn.url}/map.png`} alt="map"/>
            </div>
            <Container>
                <div className="position-relative">
                    <div className="obervation-card_wrapper">
                        <HomeObservationCard recent={recent}/>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default HomeMapSection;



