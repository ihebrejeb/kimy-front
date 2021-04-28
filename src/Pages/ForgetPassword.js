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
import firebase from 'firebase' ;

function ForgetPassword() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInG = () => {
  
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user);
    history.push('/signupgoogle');
  }).catch((error) => {
    console.log(error.message)
  })
}
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  /* const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }; */

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signIn = (e) => {
    e.preventDefault();
  
      auth.signInWithEmailAndPassword(email, password)
      dispatch(login(email, password))
        .then(() => {
          history.push('/signupgoogle')
        })
        .catch(() => {
        });
  };

  const resetpass = (e) => {
    e.preventDefault();
  
    auth.sendPasswordResetEmail(email).then(function() {
      history.push('/loginn')
    }).catch(function(error) {
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
      <h2 className={styles.title}>Reset password</h2>
        <form className={styles.form}>
          <TextField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email"
            placeholder="email"
            type="email"
          />

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={resetpass}
          >
            Send email
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
