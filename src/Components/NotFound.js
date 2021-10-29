import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import MyButton from "../base/MyButton";

function NotFound() {
  return (
    <Container>
      <Typography variant="h2" sx={{ fontWeight: "bold" }} gutterBottom>
        4
        <span role="img" aria-label="sad emoji">
          🙁
        </span>
        4
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        This Page does not exist
      </Typography>
      <MyButton styles={{ marginTop: 10 }} label="Back to home" link="/" />
    </Container>
  );
}

export default NotFound;

const Container = styled("div")`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
