import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function Banner() {
  const ExploreNowClicked = () => {};
  return (
    <div className="hero-banner">
      <Container>
        <div className="hero-banner-inner">
          <div className="border-line"></div>
          <div className="banner-text">
            <h2>Explore Sprites Observations!</h2>
            <p>
              Learn about sprites and other Transient Luminous Events (TLEs),
              upload your own observations, and engage with our citizen
              scientist community.
            </p>
            <Button
              variant="Secondary"
              size="xxl"
              className="explore-btn"
              onClick={ExploreNowClicked}
            >
              Explore Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
