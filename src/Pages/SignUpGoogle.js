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
import "./Login.css";
import { loging } from "../features/AppBase/user/actions/auth.js";
import styles from "./SignUp.module.css";
import FileBase from "react-file-base64";
import firebase from "firebase";
import { auth } from "../Firebase";
import { Button, Divider } from "@material-ui/core";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerg } from "../features/AppBase/user/actions/auth.js";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import { useRef } from "react";

function SignUpGoogle() {
  const [userexists, setuserexists] = useState(false);
  const [birthdate, setbirthdate] = useState(new Date());
  const [avatar, setavatar] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const socketRef = useRef();
  const fireUsr = auth.currentUser;
  const email = fireUsr.email;
  const isgoogle = true;
  console.log(fireUsr.displayName);
  console.log(fireUsr.email);
  console.log(fireUsr.photoURL);
  console.log(userexists);
  useEffect(() => {
    socketRef.current = io.connect(
      "https://floating-cliffs-13024.herokuapp.com"
    );
    socketRef.current.emit("find me user", { email });
    socketRef.current.on("result of user", ({ mybool }) => {
      console.log("socket returning result");
      console.log(mybool);
      setuserexists(mybool);
    });
    if (userexists) {
      dispatch(loging(email))
        .then(() => {
          history.push("/app/courses");
          window.location.reload(false);
        })
        .catch(() => {});
    }
    return () => socketRef.current.disconnect();
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(avatar);

    dispatch(
      registerg(
        fireUsr.displayName,
        fireUsr.email,
        birthdate,
        fireUsr.photoURL,
        isgoogle
      )
    )
      .then(() => {
        history.push("/app/courses");
        window.location.reload(false);
      })
      .catch(() => {});
  };

  return (
    <div className={styles.page}>
      <img
        className={styles.logo}
        src="/Logo.png"
        alt="KIMY"
        onClick={() => history.push("/")}
      />
      <div className={styles.signUp}>
        <h2 className={styles.title}>Hello</h2>
        <h2 className={styles.title}>{auth.currentUser.displayName}</h2>
        <h4 className={styles.title}>Please provide us your birthdate</h4>
        <form className={styles.form}>
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

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleRegister}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpGoogle;
