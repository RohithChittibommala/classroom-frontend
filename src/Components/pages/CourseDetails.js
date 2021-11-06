import {
  LinearProgress,
  Container,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import DropBoxChooser from "react-dropbox-chooser";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link, useParams } from "react-router-dom";
import api from "../../network";
import { useAppState } from "../../state";
import CreateAnnouncement from "../modals/CreateAnnouncement";
import CreateAssignment from "../modals/CreateAssignment";

function CourseDetails() {
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);

  const [isAssingmentModalOpen, setAssignmentModalOpen] = useState(false);

  const [checked, setChecked] = useState(false);

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
  }, [params.id]);

  function createAnnouncement({ text }) {
    api
      .createAnnouncement({ text, courseCode: courseDetails.courseCode })
      .then(({ data }) => {});
  }

  function createAssignment(props) {
    const data = {
      ...props,
      courseCode: courseDetails.courseCode,
    };

    api
      .createAssignment(data)
      .then(({ data }) => {
        setCourseDetails((data) => ({
          ...data,
          assignments: data.assignments.filter(
            (assignment) => assignment._id !== props.assignmentId
          ),
        }));
      })
      .catch((err) => {});
  }

  const handleAssignmentSubmit = (props) => {
    const data = {
      ...props,
      studentId: state.user._id,
      courseCode: courseDetails.courseCode,
    };

    api
      .submitAssignment(data)
      .then(({ data }) => {})
      .catch((err) => {});
  };

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
          <Typography variant="subtitle1" sx={{ color: "#fff" }} gutterBottom>
            {courseDetails.description}
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
        <FormControlLabel
          sx={{ marginLeft: "auto" }}
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label="Show Assignments"
        />
      </OptionsContainer>

      <DetailsContainer>
        {checked ? (
          <ShowAssignments
            assingments={courseDetails.assignments}
            instructor={instructor}
            role={state.role}
            id={state.user._id}
            courseId={courseDetails._id}
            handleAssignmentSubmit={handleAssignmentSubmit}
          />
        ) : (
          <ShowAnnouncements
            announcements={courseDetails.announcements}
            instructor={instructor}
          />
        )}
      </DetailsContainer>
    </Container>
  );
}

export default CourseDetails;

function ShowAnnouncements({ announcements, instructor }) {
  return announcements?.map((item) => (
    <Layout key={item._id}>
      <Header>
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
      </Header>
      <Content>
        <Typography
          variant="body1"
          sx={{ fontSize: "15px", color: "rgb(0 0 0 / 87%)" }}
        >
          {item.text}
        </Typography>
      </Content>
    </Layout>
  ));
  // ({ })
}

function ShowAssignments({ assingments, ...props }) {
  return assingments?.map((item) => (
    <Assignment key={item._id} item={item} {...props} />
  ));
  // ({ })
}

function Assignment({
  item,
  instructor,
  role,
  handleAssignmentSubmit,
  id,
  courseId,
}) {
  const isStudent = role === "student";

  const [submittted, setSubmittted] = useState(false);

  const onUploadSuccess = (file) => {
    const data = {
      assignmentId: item._id,
      pdf: file[0].link,
    };
    handleAssignmentSubmit(data);
    setSubmittted(true);
  };

  return (
    <Layout key={item._id}>
      <Header>
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
        <Button variant="text" color="error" style={{ marginLeft: "auto" }}>
          Deadline - {new Date(item.deadline).toDateString()} {"  "}
          {new Date(item.deadline).toLocaleTimeString()}
        </Button>
      </Header>
      <Content>
        <Typography
          variant="body1"
          sx={{ fontSize: "15px", color: "rgb(0 0 0 / 87%)" }}
          gutterBottom
        >
          {item.description}
        </Typography>
        <BtnContainer>
          {item.pdf && (
            <a
              href={item.pdf}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<AttachFileIcon />}
                style={{ margin: "10px 0" }}
              >
                Attachment
              </Button>
            </a>
          )}
          {isStudent &&
            (item.submissions.find((s) => s.studentId === id) ? (
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="text"
              >
                Turned In
              </Button>
            ) : (
              <DropBoxChooser
                appKey={"33gskexm27bl6ql"}
                success={onUploadSuccess}
                cancel={() => console.log("cancelled")}
                extensions={[".pdf"]}
                disabled={submittted}
              >
                <Button sx={{ marginLeft: "20px" }} variant="text">
                  Upload File
                </Button>
              </DropBoxChooser>
            ))}
        </BtnContainer>

        {role === "instructor" && (
          <Link
            to={`/submission/${courseId}/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              color="primary"
              style={{ marginLeft: "auto" }}
              endIcon={<ArrowRightAltIcon />}
            >
              see all submissions
            </Button>
          </Link>
        )}
      </Content>
    </Layout>
  );
}

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

const Layout = styled("div")`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 6px 0px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
  padding: 24px;
`;

const DetailsContainer = styled("div")`
  padding: 10px;
  margin-left: auto;
`;

const Header = styled("div")`
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

const Content = styled("div")`
  padding: 10px 0;
  margin-top: 10px;
`;

const OptionsContainer = styled("div")`
  padding: 10px;
  display: flex;
`;

const BtnContainer = styled("div")`
  display: flex;
  align-items: center;
  & > button {
    margin-right: 10px;
  }
`;
