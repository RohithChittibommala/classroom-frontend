import React from "react";
import { makeStyles } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAppState } from "./state";
import Signup from "./Components/home/Signup";
import Login from "./Components/home/Login";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/navbar/Navbar";
import NotFound from "./Components/NotFound";
import Pending from "./Components/Pending";
import ApprovedCourses from "./Components/pages/ApprovedCourses";
import Instructors from "./Components/admin/Instructors";
import CourseDetails from "./Components/pages/CourseDetails";
function App() {
  let { state } = useAppState();

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {state.user && <Navbar />}
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/approved" component={ApprovedCourses} />
        <PrivateRoute exact path="/pending" component={Pending} />
        <CourseRoute exact path="/c/:id" component={CourseDetails} />
        <AdminRoute exact path="/instructors" component={Instructors} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="*" component={NotFound} />
        <Route exact path="/notfound" component={NotFound} />
      </Switch>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "hidden",
    minHeight: "100vh",
    [theme.breakpoints.up(780)]: {
      width: "100%",
    },
  },
}));

function PrivateRoute(props) {
  let { state } = useAppState();
  return state.user ? <Route {...props} /> : <Redirect to="/login" />;
}

function AdminRoute(props) {
  let { state } = useAppState();
  return state.user && state.user.isAdmin ? (
    <Route {...props} />
  ) : (
    <Redirect to="/notfound" />
  );
}

function CourseRoute(props) {
  let { state } = useAppState();

  if (!state.user) return <Redirect to="/notfound" />;

  const courses = state.courses;

  const doesItInclude = courses
    .map((c) => c._id)
    .includes(props.computedMatch.params.id);

  if (!doesItInclude && state.role !== "admin")
    return <Redirect to="/notfound" />;

  return <Route {...props} />;
}

export default App;
