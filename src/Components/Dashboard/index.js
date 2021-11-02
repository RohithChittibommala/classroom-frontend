import React from "react";
import { makeStyles } from "@material-ui/core";
import { CircularProgress, Typography } from "@mui/material";
import ClassroomCard from "../coursecard";
import api from "../../network";
import { useAppState } from "../../state";
import { removeCourse, setCourses } from "../../state/reducer";
import Options from "../admin/Options";
import MyAlert from "../../base/MyAlert";
import CreateInstructor from "../modals/CreateInstructor";
import CreateCourse from "../modals/CreateCourse";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

function Dashboard() {
  const { dispatch, state } = useAppState();

  const [loading, setLoading] = React.useState(false);

  const [showAlert, setShowAlert] = React.useState(false);

  const [error, setError] = React.useState({});

  const [isOpen, setIsOpen] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    fetchData();
  }, []);

  function makeReqBasedOnRole() {
    if (state.role === "admin")
      api.getApprovedCourses().then(({ data }) => dispatch(setCourses(data)));
    else if (state.role === "student") {
      api.getEnrolledCourses(state.user._id).then(({ data }) => {
        console.log(data?.courses?.filter((c) => c.isApproved));
        dispatch(setCourses(data?.courses?.filter((c) => c.isApproved)));
      });
    } else {
      api.getCoursesByInstructor().then(({ data }) => {
        console.log(data);
        dispatch(setCourses(data));
      });
    }
  }

  const handleCreateInstructor = async (val) => {
    try {
      const { data } = await api.register(val);
      setError(data);
    } catch (error) {
      const { response } = error;
      const { data } = response;
      setError(data);
    } finally {
      setShowAlert(true);
    }
  };

  const handleCreateCourse = async (val) => {
    try {
      const { data } = await api.createCourse({
        ...val,
        instructor: state.user._id,
      });
      setError(data);
    } catch (error) {
      const { response } = error;
      const { data } = response;
      setError(data);
    } finally {
      setShowAlert(true);
    }
  };

  function fetchData() {
    setLoading(true);
    makeReqBasedOnRole();
    setLoading(false);
  }

  const colors = ["#36474F", "#566E7A", "#566E7A", "#32AC71", "#863A95"];

  if (loading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  } else {
    return (
      <div className={classes.container}>
        {showAlert && (
          <MyAlert
            message={error.message}
            severity={error.status}
            onClose={() => setShowAlert(false)}
          />
        )}
        {state.role === "admin" && (
          <>
            <CreateInstructor
              handleClose={() => setIsOpen(false)}
              open={isOpen}
              handleCreateInstructor={handleCreateInstructor}
            />
            <Options onClick={() => setIsOpen(true)} label="ADD INSTRUCTOR" />
          </>
        )}
        {state.role === "instructor" && (
          <>
            <CreateCourse
              handleClose={() => setIsOpen(false)}
              open={isOpen}
              handleCreateCourse={handleCreateCourse}
            />
            <Options onClick={() => setIsOpen(true)} label="ADD COURSE" />
          </>
        )}
        {state.courses.length === 0 && loading && (
          <CenterContainer>
            <Typography variant="h3" fontWeight="500" sx={{ color: "#BABABA" }}>
              You didn't have any courses yet.
            </Typography>
          </CenterContainer>
        )}

        <div className={classes.cardContainer}>
          {state.courses.map((course, index) => (
            <div key={course._id}>
              <Link to={`c/${course._id}`} style={{ textDecoration: "none" }}>
                <ClassroomCard
                  showButtons={false}
                  course={course}
                  admin={state.role === "admin"}
                  color={colors[index % (colors.length - 1)]}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      margin: "10px",
    },
  },
}));

const CenterContainer = styled("div")`
  display: flex;
  justify-content: center;
  height: 60vh;
  align-items: center;
`;
