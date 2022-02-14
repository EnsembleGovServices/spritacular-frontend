import React from "react";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMobile);
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
