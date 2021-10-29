import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function MyAlert({ severity, title, message, onClose }) {
  return (
    <Alert severity={severity} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      <strong>{message}</strong>
    </Alert>
  );
}

export default MyAlert;
