import React from "react";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import api from "../../network";
import { useAppState } from "../../state";
import ClassroomCard from "../coursecard";
import { removeCourse } from "../../state/reducer";

function PendingCourses() {
  const [loading, setLoading] = React.useState(false);

  const { state, dispatch } = useAppState();

  const [courses, setCourses] = React.useState([]);

  const classes = useStyles();

  React.useEffect(() => {
    fetchData();
  }, []);

  const approveCourse = async ({ courseCode }) => {
    const { data } = await api.approveCourse({ courseCode });

    setCourses(courses.filter((course) => course.courseCode !== courseCode));
  };

  const rejectCourse = async ({ courseCode }) => {
    setCourses(courses.filter((course) => course.courseCode !== courseCode));
  };

  async function fetchData() {
    setLoading(true);
    if (state.role === "instructor") {
      api.getPendingCoursesByInstructor().then(({ data }) => setCourses(data));
    } else if (state.role === "admin") {
      api
        .getAllCourses()
        .then(({ data }) =>
          setCourses(data.filter((course) => !course.isApproved))
        );
    }
    setLoading(false);
  }

  const colors = ["#36474F", "#566E7A", "#566E7A", "#32AC71", "#863A95"];

  return (
    <div className={classes.container}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.cardContainer}>
          {courses.map((course, index) => (
            <ClassroomCard
              key={course._id}
              course={course}
              approveCourse={() => approveCourse(course)}
              rejectCourse={() => rejectCourse(course)}
              admin={state.role === "admin"}
              showButtons={state.role === "student" || state.role === "admin"}
              color={colors[index % (colors.length - 1)]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingCourses;

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
