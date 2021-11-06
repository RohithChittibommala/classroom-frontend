import React, { useState } from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Drawer from "../Drawer";
import { useAppState } from "../../state";
import { setUserData } from "../../state/reducer";
function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const history = useHistory();
  const { dispatch } = useAppState();

  const classes = useStyles();

  function handleOpenDrawer() {
    setDrawerOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem("classroomToken");
    dispatch(setUserData(null));
    history.push("/login");
  }

  return (
    <nav className={classes.nav}>
      <Drawer handleOpenDrawer={handleOpenDrawer} open={isDrawerOpen} />
      <div className={classes.navLeft}>
        <IconButton onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
        <img src="/logo.jpg" alt="iiitv logo" className={classes.logo} />
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
      <Button
        variant="contained"
        sx={{ marginLeft: "auto", marginRight: "10px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </nav>
  );
}

const useStyles = makeStyles((theme) => ({
  nav: {
    height: "65px",
    backgroundColor: "#fff",
    // width: "100%",
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    marginBottom: " 5px",
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
