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

function Register() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});

  const history = useHistory();

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

  const handleUserRegister = async () => {
    if (email === "" || password === "" || name === "") {
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
        name,
        role: "student",
      };
      const res = await api.register(loginData);

      console.log(res);

      history.push("/login");

      if (res.status > 200 && res.status < 300) {
        setError({
          message: "Registeration Successful now Login",
          severity: "success",
        });
      }
    } catch (error) {
      const { data } = error.response;
      setError(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
              <b>Create account</b>
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Already have account <Link to="/login"> Sign in</Link>
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
              label="Name"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onClick={handleUserRegister}
              fullWidth
              disabled={loading}
              label="Register"
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
    [theme.breakpoints.up(780)]: {
      width: "25%",
      marginTop: "100px",
      padding: theme.spacing(3),
      borderTop: "4px solid #626EE3",
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[2],
      margin: "0 auto",
    },
  },

  button: {
    backgroundColor: "#626EE3",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export default Register;
