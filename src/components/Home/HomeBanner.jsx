import {Container, Button} from 'reactstrap';

const HomeBanner = () =>{
    return (
        <>
            <div className="hero-banner">
                <Container>
                <div className="hero-banner-inner">
                    <div className="border-line" />
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
            </div>
        </>
    )
}
export default HomeBanner;