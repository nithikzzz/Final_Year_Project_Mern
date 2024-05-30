import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import UserDetail from "./profile"; // Import UserDetail component
import axios from "axios";

//mui
import "./Navbar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import Sidenav from "./Sidenav";
//mui

const Navbar = ({ setSearchQuery }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation(); // Get the current location

  const handleClick = async () => {
    try {
      // Ensure 'user' is defined before accessing 'email'
      if (user) {
        const response = await axios.post("/log/logout", { email: user.email });
        logout();
      } else {
        console.error("User is not defined.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  //mui
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick1 = (event /** @type {MouseEvent<HTMLElement}*/) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //mui

  return (
    <>
      <AppBar sx={{ backgroundColor: "hsl(240, 100%, 10%)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <LocalLibraryIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography variant="h4" component="div">
              DigIn
            </Typography>
            <Typography variant="h5" component="div">
              <div className="subtitle" style={{ marginTop: "18px" }}>
                - Stock Register
              </div>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/desk" className="bttn">
              Home
            </Link>
            <Link to="/about" className="bttn">
              About
            </Link>
            <Link to="/about" className="bttn">
              Contact Us
            </Link>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick1}
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ display: { xs: "none", md: "flex" } }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {user && (
              <Box>
                <MenuItem>
                  <ListItemIcon>
                    <Person2Icon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    <Link to="/pro" className="ntext">
                      Profile
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleClick} className="ntext">
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Log out
                </MenuItem>
              </Box>
            )}

            {!user && (
              <MenuItem>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">
                  <Link to="/login" className="ntext">
                    Login
                  </Link>
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Render UserDetail component only when the current route is "/pro" */}
      {location.pathname === "/pro" && user && (
        <UserDetail email={user.email} />
      )}
      <>
        <div className="side">
          <Sidenav setSearchQuery={setSearchQuery} />
        </div>
      </>
    </>
  );
};

export default Navbar;
