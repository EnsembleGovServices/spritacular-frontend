import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DrawerComponent from "./DrawerComponent";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2E3B55" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div>
              <Link to="/about_us">About Us</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/tutorial">Tutorial</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/verify">Verify</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
