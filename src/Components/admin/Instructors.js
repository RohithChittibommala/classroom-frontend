import React from "react";
import { styled } from "@mui/system";
import { Divider, IconButton, Typography } from "@mui/material";
import { MailOutlineOutlined as Email } from "@mui/icons-material";
import api from "../../network";

function Instructors() {
  React.useEffect(() => {
    getInstructors();
  }, []);

  const [instructors, setInstructors] = React.useState([]);

  async function getInstructors() {
    const { data } = await api.getAllInstructors();
    setInstructors(data);
  }

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          color: "#1967D2",
          padding: "10px",
        }}
      >
        Teachers
      </Typography>
      <Divider sx={{ borderColor: "#1967D2", mb: "20px" }} />

      {instructors.map((instructor) => (
        <React.Fragment key={instructor._id}>
          <Details>
            <Image src={instructor.imageUrl} />
            <Name>{instructor.name}</Name>
            <IconButton sx={{ marginLeft: "auto" }}>
              <a
                href={`mailto:${instructor.email}`}
                style={{ color: "#5F6368" }}
              >
                <Email />
              </a>
            </IconButton>
          </Details>
          <Divider />
        </React.Fragment>
      ))}
    </Container>
  );
}

export default Instructors;

const Container = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "60%",
    padding: "20px",
    margin: "0 auto",
  },
}));

const Details = styled("div")(({ theme }) => ({
  padding: "10px",
  display: "flex",
  alignItems: "center",
}));

const Image = styled("img")(({ theme }) => ({
  width: "35px",
  height: "35px",
  marginRight: "30px",
  borderRadius: "50%",
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#3C4043",
  fontWeight: "500",
  textTransform: "uppercase",
}));
