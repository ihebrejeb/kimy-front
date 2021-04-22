import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth } from "../Firebase";
import "./Login.css";
import styles from "./SignUp.module.css";
import FileBase from "react-file-base64";
import firebase from 'firebase' ;
import { Button, Divider } from "@material-ui/core";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { register } from "../features/AppBase/user/actions/auth.js";
import { useDispatch, useSelector } from "react-redux";


function SignUp() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [username, setusername] = useState("");
  const [birthdate, setbirthdate] = useState(new Date());
  const [avatar, setavatar] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  /* const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        history.push('/app/courses');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
  
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user);
    history.push('/app/courses');
  }).catch((error) => {
    console.log(error.message)
  })
} */

const handleRegister = (e) => {
  e.preventDefault();
  console.log(avatar)
  
    dispatch(register(username, email, password, confirmpassword, birthdate, avatar))
      .then(() => {
        console.log(username)
        console.log(email)
        console.log(password)
        history.push('/app/courses')
        window.location.reload(false);
      })
      .catch(() => {
      });
};


  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <h2 className={styles.title}>Sign up</h2>
        <Divider variant="middle" className={styles.divider} />
        <form className={styles.form}>
          <TextField
            value={username}
            onChange={(e) => setusername(e.target.value)}
            label="Username"
            placeholder="username"
            type="text"
          />

          <TextField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email"
            placeholder="email"
            type="email"
          />

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Password
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

          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm password
            </InputLabel>

            <Input
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
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

          <TextField
            value={birthdate}
            onChange={(e) => setbirthdate(e.target.value)}
            label="Birthdate"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <p>Upload your avatar</p>
          <div className={styles.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setavatar(base64)}
            />
          </div>

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </form>
      </div>
     {/*  <div>
        <button onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
      </div> */}
    </div>
  );
}

export default SignUp;
