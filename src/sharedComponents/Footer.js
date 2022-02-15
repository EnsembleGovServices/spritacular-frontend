import React from "react";
import footerwhitelogo from "../assets/images/Spritacular-white.png";
import nasa from "../assets/images/nasa.png";
import catholic from "../assets/images/catholic.png";
import facebook from "../assets/images/facebook.png";
import linkedin from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import Grid from "@mui/material/Grid";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button, Container } from "@mui/material";
import Link from "@mui/material/Link";
import { Box } from "@mui/system";
import Copyright from "@mui/icons-material/Copyright";

function Footer() {
  return (
    <Box color={"primary"} className="footer-main" padding={"30px"}>
      <Container>
        <Grid container>
          <Grid item md={12}>
            <Box margin="0 0 20px 0">
              <Link href="#">
                <img src={footerwhitelogo} alt="Footer logo" />
              </Link>
            </Box>
          </Grid>
          <Grid item md={5}>
            <Grid container>
              <Grid item md={6}>
                <Box>
                  <Link href="#">
                    <img src={nasa} alt="nasa" />
                  </Link>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>
                  <Link href="#" className="border-line-link">
                    <img src={catholic} alt="catholic" />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7}>
            <Grid container>
              <Grid item md={4}>
                <Box>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Discover Now
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Our Story
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    FAQ
                  </Link>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    About Us
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Gallery
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Tutorial
                  </Link>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Blog
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Verify
                  </Link>
                  <Link
                    underline="none"
                    display="block"
                    color="#fff"
                    padding="15px 10px"
                    fontSize={14}
                    href="#"
                  >
                    Register
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container className="footer-social">
          <Grid item md={9}>
            <Box color="#fff" fontSize={12} sx={{ opacity: "0.7" }}>
              <p>© 2022 Spritacular. All rights reserved.</p>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box>
              <div className="social-icon">
                <Link href="#">
                  <img src={facebook} alt="facebook" />
                </Link>
                <Link href="#">
                  <img src={linkedin} alt="facebook" />
                </Link>
                <Link href="#">
                  <img src={twitter} alt="facebook" />
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
