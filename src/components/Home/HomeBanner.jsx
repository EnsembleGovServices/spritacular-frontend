import {Container, Button} from 'reactstrap';
import {cdn} from "../../helpers/url";

const HomeBanner = () => {
    return (
        <section className="hero-banner">
            <div className="bg-img">
                <img src={`${cdn.url}/homePage.png`} alt="homepage"/>
            </div>
            <Container>
                <div className="hero-banner-inner">
                    <div className="banner-text">
                        <h2>Explore Sprites Observations!</h2>
                        <p>
                            Learn about sprites and other Transient Luminous Events (TLEs),
                            upload your own observations, and engage with our citizen
                            scientist community.
                        </p>
                        <Button outline className="explore-btn">Learn More</Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default HomeBanner;