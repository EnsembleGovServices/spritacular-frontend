import React from "react";
import footer from "../assets/images/footer.png";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button } from "@mui/material";

function Footer() {
  return (
    <div>
      <img style={{ paddingBottom: "100px" }} src={footer} alt="Footer logo" />
      <CopyrightIcon />
      <p>2022 Spritacular.All rights reserved.</p>
      <Button>Discover Now</Button>
      <Button>Our Story</Button>
      <Button>FAQ</Button>
      <Button>About Us</Button>
      <Button>Gallery</Button>
      <Button>Tutorial</Button>
      <Button>Blog</Button>
      <Button>Verify</Button>
      <Button>Register</Button>
    </div>
  );
}

export default Footer;
