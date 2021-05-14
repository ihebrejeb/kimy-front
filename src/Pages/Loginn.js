import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../Firebase";
import "./Login.css";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { login } from "../features/AppBase/user/actions/auth.js";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Login.css";
import styles from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, Divider } from "@material-ui/core";
import firebase from "firebase";
import { UPDATEPASSWORDD } from "../features/AppBase/user/actions/types";
import axios from "axios";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInG = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user);
        history.push("/signupgoogle");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const UpdatePasss = (email, password) => {
    console.log("updatin password first");
    return axios
      .post("http://floating-cliffs-13024.herokuapp.com/user/updatepass", {
        email,
        password,
      })
      .then((response) => {
        dispatch(login(email, password))
          .then(() => {
            history.push("/app/courses");
            window.location.reload(false);
          })
          .catch(() => {});
      });
  };

  const doUpdatepassword = (e) => {
    console.log("const doUpdatepassword");
    UpdatePasss(email, password);
    dispatch({
      type: UPDATEPASSWORDD,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        doUpdatepassword();
      })
      .catch(function (error) {
        window.location.reload(false);
      });
  };

  return (
    <div className={styles.page}>
      <img
        className={styles.logo}
        src="./logo.png"
        alt="KIMY"
        onClick={() => history.push("/")}
      />
      <div className={styles.signIn}>
        <h2 className={styles.title}>Sign in</h2>
        <form className={styles.form}>
          <TextField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email"
            placeholder="email"
            type="email"
          />

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              New password
            </InputLabel>

            <Input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={loginIn}
          >
            Login{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
