import {lazy, Suspense} from "react";
import {Container} from 'reactstrap';
import {cdn} from "../../helpers/url";

const HomeObservationCard = lazy(() => import('./HomeObservationCard'))

const HomeMapSection = (props) => {
    const {loading} = props;
    return (
        <section className="map_section bg-black">
            <div className="map_inner">
                <img className="img-fluid" src={`${cdn.url}/map.png`} alt="map"/>
            </div>
            <Container>
                <div className="position-relative">
                    <div className="obervation-card_wrapper">
                        <Suspense fallback={<div></div>}>
                            <HomeObservationCard loading={loading}/>
                        </Suspense>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default HomeMapSection;



