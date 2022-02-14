import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Register from "../../assets/images/Register.png";
import dragdrop from "../../assets/images/drag-drop.jpg";
import jet from "../../assets/images/jet.jpg";
import Howitworks_second from "../../assets/images/Howitworks_second.png";
import Topimage from "../../assets/images/how-it-works-top.png";
import Registerpolygon from "../../assets/images/register-polygon.png";
import observepolygon from "../../assets/images/Learn-observe-polygon.png";
import sharepolygon from "../../assets/images/share-polygon.png";
import engagepolygon from "../../assets/images/engage-polygon.png";
import bottompolygon from "../../assets/images/bottom-polygon.png";

import { Button } from "@mui/material";

function HowItWorks() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="how-it-works-section">
      <div className="top-polygone">
        <img src={Topimage} alt="" />
      </div>
      <div className="bottom-polygone">
        <img src={bottompolygon} alt="" />
      </div>
      <Container>
        <h2>How it works</h2>

        <Box>
          <Grid container rowSpacing={12} spacing={10} alignItems={"center"}>
            <Grid item xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>1</span>Register
                </h3>
                <p>
                  Create an account to become a Spritacular Citizen Scientist.
                </p>
                <div className="register-polygon">
                  <img src={Registerpolygon} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <img src={Register} alt="Register/SignUp demo" />
            </Grid>

            <Grid item xs={6}>
              <img src={Howitworks_second} alt="How it works under Register" />
            </Grid>
            <Grid item xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>2</span>Learn & Observe
                </h3>
                <p>
                  Complete the observation tutorial before starting to observe a
                  sprite. This is intended to make sure your observation inline
                  with our standards.
                </p>
                <Button>View Tutorial</Button>
                <div className="observe-polygon">
                  <img src={observepolygon} alt="" />
                </div>
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>3</span>Share
                </h3>
                <p>
                  Upload your observation images and choose the appropriate
                  observation category(sprite, elve, gigantic jet, blue jet, or
                  other). You need to complete other details as well such as
                  location, date, time, and your camera details.
                </p>
                <div className="share-polygon">
                  <img src={sharepolygon} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <img src={dragdrop} alt="Share" />
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                <img src={jet} alt="Share" />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>4</span>Engage
                </h3>
                <p>
                  Review and left comment on other citizen scientist
                  observations.
                </p>
                <div className="engage-polygon">
                  <img src={engagepolygon} alt="Share" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default HowItWorks;
