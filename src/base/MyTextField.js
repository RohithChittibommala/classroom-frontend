import { makeStyles } from "@material-ui/core";
import { TextField } from "@mui/material";
import React from "react";

const MyTextField = (props) => {
  const classes = useStyles();
  return <TextField {...props} fullWidth className={classes.textField} />;
};

export default MyTextField;

const useStyles = makeStyles((theme) => ({
  textField: {
    fontSize: "16px",
    outline: "none",
    border: "none",
  },
}));
