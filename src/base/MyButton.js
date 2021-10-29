import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";

const defaultStyles = {
  boxShadow: "none",
  fontSize: 16,
  textTransform: "uppercase",
  padding: "6px 12px",
  color: "#fff",
  lineHeight: 1.5,
  backgroundColor: "#448EF1",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
  "&.disabled": {
    cursor: "not-allowed",
    boxShadow: "0 0 0 0 rgba(0, 127, 255, 0)",
  },
};

const StyledButton = styled(Button)(({ styles }) => {
  return { ...defaultStyles, ...styles };
});

function MyButton({ label, link, ...rest }) {
  if (!link) return <StyledButton {...rest}>{label}</StyledButton>;

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <StyledButton {...rest}>{label}</StyledButton>
    </Link>
  );
}

export default MyButton;
