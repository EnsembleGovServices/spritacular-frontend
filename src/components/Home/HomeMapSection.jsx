import {Container} from 'reactstrap';
import {cdn} from "../../helpers/url";
import HomeObservationCard from "./HomeObservationCard";

// To show map in home page behind the observation
const HomeMapSection = (props) => {
    const {recent} = props;
    return (
        <section className="map_section bg-black">
            <div className="map_inner">
                <img width={1200} height={600} className="img-fluid" src={`${cdn.url}/map.png`} alt="map"/>
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



