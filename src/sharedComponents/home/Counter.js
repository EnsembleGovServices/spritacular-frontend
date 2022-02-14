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
            <div className="counter-inner">
              <div className="left-image">
                <img src={user} alt="Users" />
              </div>
              <div className="right-counter">
                <h3>22,500</h3>
                <p>Storm chasers</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="counter-inner">
              <div className="left-image">
                <img src={user} alt="user" />
              </div>
              <div className="right-counter">
                <h3>5,678,910</h3>
                <p>Images Submitted</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="counter-inner">
              <div className="left-image">
                <img src={country} alt="country" />
              </div>
              <div className="right-counter">
                <h3>250</h3>
                <p>Countries Participated</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default counter;
