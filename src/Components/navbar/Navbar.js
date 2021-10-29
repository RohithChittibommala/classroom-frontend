import React, { useState } from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppState } from "../../state";
import Drawer from "../Drawer";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { state } = useAppState();

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleOpenDrawer() {
    setDrawerOpen((prev) => !prev);
  }

  return (
    <nav className={classes.nav}>
      <Drawer handleOpenDrawer={handleOpenDrawer} open={isDrawerOpen} />
      <div className={classes.navLeft}>
        <IconButton onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
        <img
          src="http://iiitvadodara.ac.in/img/Logo.jpg"
          alt="iiitv logo"
          className={classes.logo}
        />
        <Typography
          variant="subtitle1"
          style={{
            color: "#5f6368",
            fontSize: "22px",
            marginLeft: "10px",
          }}
        >
          Classroom
        </Typography>
      </div>
    </nav>
  );
}

const useStyles = makeStyles((theme) => ({
  nav: {
    height: "65px",
    backgroundColor: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: " 20px",
    padding: "0px 20px",
    borderBottom: "1px solid #e6e6e6",
  },
  logo: {
    width: "30px",
    height: "30px",
    margin: "0px 0px 0px 10px",
  },

  navLeft: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
}));

export default Navbar;
