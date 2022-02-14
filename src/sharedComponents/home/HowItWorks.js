import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Register from "./Register.png";
import Frame from "./Frame.png";
import Frame77 from "./Frame77.png";
import Howitworks_second from "./Howitworks_second.png";
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
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        How it works
      </h1>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              1 Register
              <p>
                Create an account to become a Spritacular Citizen Scientist.
              </p>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <img
                style={{
                  width: "560px",
                  height: "320px",
                  left: "566px",
                  top: "0px",
                }}
                src={Register}
                alt="Register/SignUp demo"
              />
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              <img
                style={{
                  width: "560px",
                  height: "320px",
                  left: "566px",
                  top: "0px",
                }}
                src={Howitworks_second}
                alt="How it works under Register"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              2 Learn & Observe
              <p>
                Complete the observation tutorial before starting to observe a
                sprite. This is intended to make sure your observation inline
                with our standards.
              </p>
              <Button>View Tutorial</Button>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              3 Share
              <p>
                Upload your observation images and choose the appropriate
                observation category(sprite, elve, gigantic jet, blue jet, or
                other). You need to complete other details as well such as
                location, date, time, and your camera details.
              </p>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <img
                style={{
                  width: "560px",
                  height: "320px",
                  left: "566px",
                  top: "0px",
                }}
                src={Frame}
                alt="Share"
              />
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              <img
                style={{
                  width: "560px",
                  height: "320px",
                  left: "566px",
                  top: "0px",
                }}
                src={Frame77}
                alt="Share"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              4 Engage
              <p>
                Review and left comment on other citizen scientist observations.
              </p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HowItWorks;
