import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { StyledLink } from "../Styles/style";

export default function Navbar() {
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ margin: "5px", padding: "5px" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cloudy Notes
        </Typography>

        <Button color="otherColor">
          <StyledLink
            component={RouterLink}
            to={"/"}
            variant={`${location.pathname === "/" ? "outlined" : "none"}`}
          >
            Home
          </StyledLink>
        </Button>
        <Button>
          <StyledLink component={RouterLink} to={"/login"}>
            Login
          </StyledLink>
        </Button>
        <Button>
          <StyledLink component={RouterLink} to={"/signup"}>
            Signup
          </StyledLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
