import { LinearProgress, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../network";

import { useAppState } from "../../state";
import CreateAnnouncement from "../modals/CreateAnnouncement";
import CreateAssignment from "../modals/CreateAssignment";

function CourseDetails() {
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);

  const [isAssingmentModalOpen, setAssignmentModalOpen] = useState(false);

  const { state } = useAppState();

  const [courseDetails, setCourseDetails] = useState({});

  const [instructor, setInstructor] = useState({});

  useEffect(() => {
    api
      .getCourseDetailsById(params.id)
      .then(({ data }) => {
        setCourseDetails(data);
        setInstructor(data.instructor[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function createAnnouncement({ text }) {
    api
      .createAnnouncement({ text, courseCode: courseDetails.courseCode })
      .then(({ data }) => {
        console.log(data);
      });
  }

  function createAssignment(props) {
    const data = {
      ...props,
      courseCode: courseDetails.courseCode,
    };

    api
      .createAssignment(data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading)
    return <LinearProgress sx={{ position: "relative", top: -10 }} />;

  return (
    <Container maxWidth="lg">
      <Banner>
        <div>
          <Typography
            variant="h3"
            sx={{ fontWeight: "400", color: "#fff", fontSize: "36px" }}
            gutterBottom
          >
            {courseDetails.courseCode}: {courseDetails.name}
          </Typography>
        </div>
      </Banner>

      <CreateAnnouncement
        handleClose={() => setAnnouncementModalOpen(false)}
        open={isAnnouncementModalOpen}
        handleCreateAnnouncement={createAnnouncement}
      />

      <CreateAssignment
        handleClose={() => setAssignmentModalOpen(false)}
        open={isAssingmentModalOpen}
        handleCreateAssignment={createAssignment}
      />

      <OptionsContainer>
        {state.role === "instructor" && (
          <BtnContainer>
            <Button
              variant="contained"
              onClick={() => setAnnouncementModalOpen(true)}
            >
              create announcement
            </Button>
            <Button
              variant="contained"
              onClick={() => setAssignmentModalOpen(true)}
            >
              create Assignment
            </Button>
          </BtnContainer>
        )}
      </OptionsContainer>

      <AnnouncementContainer>
        {courseDetails?.announcements?.map((item) => (
          <Announcement key={item._id}>
            <AnnouncementHeader>
              <Image src={instructor.imageUrl} />
              <PersonDetails>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#444", fontWeight: 500 }}
                >
                  {instructor.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "#5F6368" }}>
                  {new Date(item.date).toDateString()}
                </Typography>
              </PersonDetails>
            </AnnouncementHeader>
            <AnnouncementContent>
              <Typography
                variant="body1"
                sx={{ fontSize: "15px", color: "rgb(0 0 0 / 87%)" }}
              >
                {item.text}
              </Typography>
            </AnnouncementContent>
          </Announcement>
        ))}
      </AnnouncementContainer>
    </Container>
  );
}

export default CourseDetails;

const Banner = styled("div")`
  height: 220px;
  background-color: rgb(86 110 122);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Announcement = styled("div")`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 6px 0px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
  padding: 24px;
`;

const AnnouncementContainer = styled("div")`
  padding: 10px;
  margin-left: auto;
`;

const AnnouncementHeader = styled("div")`
  display: flex;
  align-items: center;
`;

const Image = styled("img")`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50%;
`;

const PersonDetails = styled("div")`
  display: flex;
  flex-direction: column;
`;

const AnnouncementContent = styled("div")`
  padding: 10px 0;
`;

const OptionsContainer = styled("div")`
  padding: 10px;
`;

const BtnContainer = styled("div")`
  display: flex;

  & > button {
    margin-right: 10px;
  }
`;
