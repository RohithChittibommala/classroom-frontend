import React from "react";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MyTextField from "../../base/MyTextField";
import MyButton from "../../base/MyButton";
import MyAlert from "../../base/MyAlert";
import api from "../../network/";
import { Link, useHistory } from "react-router-dom";
import { useAppState } from "../../state";
import { setEnrolledCourses, setRole, setUserData } from "../../state/reducer";

function Login() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const history = useHistory();
  const { dispatch } = useAppState();

  const buttonStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "#0069d9",
    },
    "&.disabled": {
      cursor: "not-allowed",
    },
  };

  const handleUserLogin = async () => {
    if (email === "" || password === "") {
      setError({
        message: "Please fill all the fields",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const loginData = {
        email,
        password,
      };
      const { data } = await api.login(loginData);

      localStorage.setItem("classroomToken", data.accessToken);

      dispatch(setUserData(data.user));
      // dispatch(setEnrolledCourses(data.user.courses));

      if (data.user.isAdmin) {
        dispatch(setRole("admin"));
      } else if (data.user.isInstructor) {
        dispatch(setRole("instructor"));
      } else dispatch(setRole("student"));

      setError({
        message: "Login Successful",
        severity: "success",
      });

      history.push("/");
    } catch (error) {
      const { data } = error.response;
      setError(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.outerContainer}>
      {error.message && (
        <MyAlert
          message={error.message}
          severity={error.status}
          onClose={() => setError({})}
        />
      )}
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              <b>Login</b>
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Don't have account <Link to="/register"> Sign up</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label="Email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label="show password"
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MyButton
              onClick={handleUserLogin}
              fullWidth
              disabled={loading}
              label="Login"
              styles={buttonStyle}
              endIcon={<ArrowRightAltIcon sx={{ fontSize: "40px" }} />}
            />
          </Grid>
          <Grid item xs={12}>
            {loading && <LinearProgress />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto",
    [theme.breakpoints.up(780)]: {
      width: "25%",
      marginTop: "100px",
      padding: theme.spacing(3),
      borderTop: "4px solid #626EE3",
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[2],
    },
  },

  button: {
    backgroundColor: "#626EE3",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },

  outerContainer: {
    minHeight: "100vh",
  },
}));

export default Login;
