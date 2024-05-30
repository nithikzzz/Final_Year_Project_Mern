import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
import "./Sidenav.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WarningIcon from "@mui/icons-material/Warning";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LockClockIcon from "@mui/icons-material/LockClock";
import InventoryIcon from "@mui/icons-material/Inventory";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

//warning
// Import NotificationProvider context
import { useNotificationContext } from "../context/notificationContext";

//search
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginTop: 65,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: 65,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "white",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//search
const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
  color: "hsl(240, 100%, 10%)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "30ch",
    height: "35px",

    "&:focus": {
      width: "40ch",
      height: "35px",
    },
  },
}));
//search

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
function Sidenav({ setSearchQuery }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthContext();
  const location = useLocation(); // Get the current location
  const [searchInput, setSearchInput] = useState("");
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // State to store the count of notifications

  //warning
  const [hasWarnings, setHasWarnings] = useState(false); // State to track if there are any warnings

  //search
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setSearchQuery(event.target.value);
  };

  const {
    state: { notifications },
  } = useNotificationContext(); // Access notifications state
  const hasNotifications = notifications.length > 0; // Check if there are any notifications

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/alert/gett");
        const count = response.data.length; // Get the count of notifications from API response
        console.log("API Response:", response.data);
        setNotificationCount(count); // Update the count of notifications in state
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };

    fetchNotifications();
  }, [notifications]);

  return (
    <>
      <div className="sidediv">
        <Box style={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            className="sidecontainer sideapp"
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                style={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* search */}
              {location.pathname === "/products" && ( // Only show search bar when on the products page
                <SearchInput>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <SearchInputBase
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                </SearchInput>
              )}
              {/* search */}
            </Toolbar>
          </AppBar>

          {user && (
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />

              <List>
                {[
                  "Alert",
                  "Notification",
                  "Add Products",
                  "Products",
                  "Scrap",
                  "Available Stock",
                ].map((text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    style={{ display: "block" }}
                  >
                    <ListItemButton
                      style={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        paddingLeft: 2.5,
                        paddingRight: 2.5,
                      }}
                    >
                      <ListItemIcon
                        style={{
                          minWidth: 0,
                          marginRight: open ? 5 : "auto",
                          marginLeft: 5,
                          justifyContent: "center",
                        }}
                      >
                        {index === 0 ? (
                          <Typography variant="inherit">
                            <Link to="/war" className="ntext">
                              <WarningIcon />
                              {hasWarnings && (
                                <div className="notification-badge1"></div>
                              )}
                            </Link>
                          </Typography>
                        ) : index === 1 ? (
                          <Typography variant="inherit">
                            <Link to="/alert" className="ntext">
                              {notificationCount > 0 && ( // Check if there are notifications
                                <div className="notification-badge">
                                  {notificationCount}{" "}
                                  {/* Display the count of notifications */}
                                </div>
                              )}
                              <NotificationsIcon />
                            </Link>
                          </Typography>
                        ) : index === 2 ? (
                          <Typography variant="inherit">
                            <Link to="/productform" className="ntext">
                              <AddShoppingCartIcon />
                            </Link>
                          </Typography>
                        ) : index === 3 ? (
                          <Typography variant="inherit">
                            <Link to="/products" className="ntext">
                              <ShoppingCartIcon />
                            </Link>
                          </Typography>
                        ) : index === 4 ? (
                          <Typography variant="inherit">
                            <Link to="/scrap" className="ntext">
                              <RemoveShoppingCartIcon />
                            </Link>
                          </Typography>
                        ) : (
                          <Typography variant="inherit">
                            <Link to="/totstock" className="ntext">
                              <InventoryIcon />
                            </Link>
                          </Typography>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        style={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              {user.email === "diginasset@gmail.com" && (
                <List>
                  {["Add Users", "Users", "Login Info"].map((text, index) => (
                    <ListItem
                      key={text}
                      disablePadding
                      style={{ display: "block" }}
                    >
                      <ListItemButton
                        style={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          paddingLeft: 2.5,
                          paddingRight: 2.5,
                        }}
                      >
                        <ListItemIcon
                          style={{
                            minWidth: 0,
                            marginRight: open ? 5 : "auto",
                            marginLeft: 5,
                            justifyContent: "center",
                          }}
                        >
                          {index === 0 ? (
                            <Typography variant="inherit">
                              <Link to="/signup" className="ntext">
                                <GroupAddIcon />
                              </Link>
                            </Typography>
                          ) : index === 1 ? (
                            <Typography variant="inherit">
                              <Link to="/userinfo" className="ntext">
                                <GroupIcon />
                              </Link>
                            </Typography>
                          ) : (
                            <Typography variant="inherit">
                              <Link to="/loginfo" className="ntext">
                                <LockClockIcon />
                              </Link>
                            </Typography>
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          style={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Drawer>
          )}
          <Box component="main" style={{ flexGrow: 1, padding: 3 }}>
            <DrawerHeader />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Sidenav;
