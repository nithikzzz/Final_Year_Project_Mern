import React from "react";
import "./About.css";
import { Box, Typography } from "@mui/material";
import image from "../images/aimage.jpg";

function About() {
  return (
    <>
      <div className="about">
        <div className="contain">
          <Box className="abox">
            <img src={image} alt="About" className="aimg" />
          </Box>
          <Box className="abox1">
            <Typography variant="h4" className="h2">
              About
            </Typography>
            <Typography className="atext">
              Welcome to DigIn Asset Management System (DAMS). Our website is
              dedicated to providing organizations with an efficient solution
              for managing resources such as keyboards, monitors, and other
              essential products. With user-friendly features and a secure
              environment, DigIn aims to streamline product management, enhance
              productivity, and promote optimal resource utilization within
              organizations. Join us in simplifying asset management and
              boosting efficiency today.
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
}

export default About;
