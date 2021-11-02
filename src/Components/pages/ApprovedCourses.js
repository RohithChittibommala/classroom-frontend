import React from "react";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import api from "../../network";
import { useAppState } from "../../state";
import ClassroomCard from "../coursecard";

function ApprovedCourses() {
  const [loading, setLoading] = React.useState(false);

  const { state } = useAppState();

  const enrolledCoursesSet = new Set(
    state.courses.map((course) => course.courseCode)
  );

  const [courses, setCourses] = React.useState([]);

  const classes = useStyles();

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    if (state.role === "instructor") {
      api.getCoursesByInstructor().then(({ data }) => setCourses(data));
    } else if (state.role === "admin") {
      const response = await api.get("/courses/approved");
      setCourses(response.data);
    } else {
      const response = await api.getApprovedCourses();
      setCourses(
        response.data.filter((c) => !enrolledCoursesSet.has(c.courseCode))
      );
    }

    setLoading(false);
  }

  async function enroll(courseCode) {
    setCourses(courses.filter((c) => c.courseCode !== courseCode));
    await api.enrollInCourse(courseCode);
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
              enroll={enroll}
              approveCourse={() => {}}
              rejectCourse={() => {}}
              course={course}
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

export default ApprovedCourses;

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
