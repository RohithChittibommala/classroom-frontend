import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";

function ClassroomCard({
  course,
  color,
  admin,
  enroll,
  showButtons = true,
  approveCourse,
  rejectCourse,
}) {
  const classes = useStyles();

  console.log({ showButtons });

  const enrollStudent = () => {
    console.log("enroll", course);
  };

  const renderButtons = () => {
    if (admin)
      return (
        <React.Fragment>
          <Button
            size="small"
            color="success"
            onClick={approveCourse}
            className={classes.button}
          >
            Approve
          </Button>

          <Button
            size="small"
            onClick={rejectCourse}
            className={classes.button}
            color="error"
          >
            Reject
          </Button>
        </React.Fragment>
      );

    return (
      <Button
        size="small"
        onClick={() => enroll(course.courseCode)}
        className={classes.button}
      >
        Enroll
      </Button>
    );
  };

  // admin@gmail.com
  //  hello_user,

  return (
    <div className={classes.container}>
      <div className={classes.upper} style={{ backgroundColor: color }}>
        <div className={classes.titleDiv}>
          <Typography variant="h6" className={classes.title} noWrap>
            {course.courseCode}-{course.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {course.instructor[0].name}
          </Typography>
        </div>
      </div>
      <div className={classes.middle}></div>
      <div className={classes.lower}>{showButtons && renderButtons()}</div>
    </div>
  );
}

export default ClassroomCard;

const useStyles = makeStyles((theme) => ({
  container: {
    height: 300,
    cursor: "pointer",
    width: 300,
    overflow: "hidden",
    margin: "0 auto",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    },
  },

  upper: {
    display: "flex",
    height: "90px",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textTransform: "capitalize",
  },

  titleDiv: {
    width: "90%",
    margin: "0 auto",
  },

  title: {
    fontSize: 22,
    fontWeight: 400,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 300,
  },

  middle: {
    height: 165,
  },
  lower: {
    borderTop: "1px solid #dcdcdc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    padding: 10,
    position: "relative",
  },

  button: {
    position: "relative",
    transform: "translateY(-40%)",
    fontWeight: 900,
  },
}));
