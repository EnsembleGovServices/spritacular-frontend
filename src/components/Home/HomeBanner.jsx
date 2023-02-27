import {Container} from 'reactstrap';
import {cdn, routeUrls} from "../../helpers/url";
import {Link} from "react-router-dom";

const HomeBanner = () => {
    return (
        <section className="hero-banner">
            <div className="bg-img">
                <img src={`${cdn.url}/homePage.png`} alt="homepage"/>
            </div>
            <Container>
                <div className="hero-banner-inner">
                    <div className="banner-text">
                        <h2>Become a Spritacular Citizen Scientist</h2>
                        <p>
                            Join the chase of Transient Luminous
                            Events (TLEs) from the ground, engage with a global community of
                            observers, and contribute your observations of TLEs for NASA Science!
                        </p>
                        <Link to={routeUrls.about} className="explore-btn btn btn-outline-primary">Learn
                            More</Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default HomeBanner;