import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth, signInWithGoogle } from "../Firebase";
import "./Login.css";
import LiveQuizz from "./LiveQuizz.js";
import styles from "./userprofile.module.css";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { logout } from "../features/AppBase/user/actions/auth.js";
import { deleteUser } from "../features/AppBase/actions/actioncrud.js";
import { Button, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";
import { SignalWifiOffOutlined } from "@material-ui/icons";



function Userprofile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [username, setusername] = useState("");
  const [birthdate, setbirthdate] = useState(new Date());
  const [avatar, setavatar] = useState("");
  const user = useSelector(state => state.user.user.data.user);
  const resu = useSelector(state => state.user.user);
  console.log(user)
  console.log(resu.token)

  const [open, setOpen] = React.useState(false);

  /* var usr = auth.currentUser;
        console.log('gola');
        console.log(usr);
        const updateprofile = () => {
  
          usr.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://picsum.photos/200/300"
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
        }
       console.log("  Name: " + usr.displayName);
    console.log("  Email: " + usr.email);
    console.log("  Photo URL: " + usr.photoURL); */

    

  useEffect(() => {
    dispatch(selectCourse(null));
  }, [dispatch]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const doLogout = (e) => {
  
      console.log('const dologout')
      dispatch(logout());
      history.push('/')
      window.location.reload(false);
  };

  const doDelete = (e) => {
  
    console.log('const dodelete')
    dispatch(deleteUser(user._id));
    localStorage.removeItem("user");
    history.push('/'); 
    window.location.reload(false);
  };
  

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  /*  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  }; */

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.page}>
      <div className={styles.infos}>
        <h2 className={styles.title}>User infos</h2>
        <Divider variant="middle" className={styles.divider} />
        <div></div>
        <img
          className={styles.imeg}
          //src="https://picsum.photos/400"
          src={user.avatar ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
          alt=""
        ></img>
        <h3 className={styles.attributess}>Username</h3>
        <p className={styles.p}>{user.username}</p>
        <h3 className={styles.attributess}>Email</h3>
        <p className={styles.p}>{user.email}</p>
        <h3 className={styles.attributess}>Birthdate</h3>
        <p className={styles.p}>{user.birthdate}</p> 
        <Button
          variant="outlined"
          color="Secondary"
          startIcon={<DeleteIcon />}
          onClick={doDelete}
        >
          Delete user
        </Button>
      </div>

      <div className={styles.update}>
        <h2 className={styles.title}>Update infos</h2>

        <Divider variant="middle" className={styles.divider} />
        <form className={styles.form}>
          <TextField
            value={username}
            onChange={(e) => setusername(e.target.value)}
            label="Username"
            placeholder={user.email}
            type="text"
          />

          <TextField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email"
            placeholder={user.email}
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
              onDone={({ base64 }) =>
                setavatar({ ...avatar, selectedFile: base64 })
              }
            />
          </div>

          {/* <FormControlLabel
            control={<Checkbox name="checkedC" />}
            label="I agree to terms and conditions"
          /> */}

          <Button variant="outlined" color="Primary" onClick={doLogout}>
            Update
          </Button>
          {/*  <h5>
            <span className={styles.signup_grey}>
              {" "}
              Do you already have an account ?
            </span>

            <span className={styles.signup_link}   onClick={signIn}> Login </span>
          </h5> */}
        </form>
      </div>
    </div>
  );
}

export default Userprofile;
