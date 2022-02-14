import React from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import user from "../../assets/images/users.png";
import submit from "../../assets/images/submit.png";
import country from "../../assets/images/country.png";

function counter() {
  return (
    <div className="counter-main">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className="left-image"></div>
            <div className="right-counter">1</div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="left-image"></div>
            <div className="right-counter">2</div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="left-image"></div>
            <div className="right-counter">3</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default counter;
