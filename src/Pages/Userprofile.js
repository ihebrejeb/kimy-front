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
import firebase from "firebase";
import LiveQuizz from "./LiveQuizz.js";
import styles from "./userprofile.module.css";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { logout, updatePass } from "../features/AppBase/user/actions/auth.js";
import {
  deleteUser,
  updateUser,
} from "../features/AppBase/actions/actioncrud.js";
import { Button, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";
import { SignalWifiOffOutlined } from "@material-ui/icons";
import Moment from "moment";
import { UPDATEPASSWORD } from "../features/AppBase/user/actions/types";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@material-ui/lab";

const schema = yup.object().shape({
  username: yup.string().min(6),
});

function Userprofile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  Moment.locale("en");
  console.log("auth");
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(auth.currentUser);
    } else {
      console.log("boo");
    }
  });

  const user = useSelector((state) => state.user.user.data.user);
  console.log(user);
  const userr = useSelector((state) => state.user.user);
  const resu = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const isgoogle = user.isgoogle;
  console.log("this is google");
  console.log(isgoogle);
  if (!userr) {
    history.push("/");
  }
  console.log("this is userr");
  console.log(userr);
  const [updateData, setupdateData] = useState({
    id: user.id,
    username: user.username,
    email: user.email,
    birthdate: user.brthdate,
    avatar: user.avatar,
  });

  const [email, setemail] = useState("");
  const [currentpassword, setcurrentpassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [username, setusername] = useState("");
  const [birthdate, setbirthdate] = useState(new Date());

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(selectCourse(null));
  }, [dispatch]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mdpok = false;

  const UpdatePasss = (id, email, password, newpassword) => {
    console.log("updatin password first");
    return axios
      .post(
        "http://http://floating-cliffs-13024.herokuapp.com//user/updatepassword",
        {
          id,
          email,
          password,
          newpassword,
        }
      )
      .then((response) => {
        window.location.reload(false);
      });
  };

  const doLogout = (e) => {
    console.log("const dologout");
    dispatch(logout());
    //history.push('/')
    window.location.reload(false);
  };

  const doDelete = (e) => {
    console.log("const dodelete");
    auth.currentUser.delete();
    dispatch(deleteUser(user._id));
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload(false);
  };

  const doUpdate = (e) => {
    console.log("const doUpdate");
    dispatch(updateUser(user._id, updateData));
    //doLogout();
    //usert.username=updateData.username;
  };

  const doUpdatepassword = (e) => {
    console.log("const doUpdatepassword");
    auth.currentUser.updatePassword(password);
    UpdatePasss(user.id, user.email, currentpassword, password);
    dispatch({
      type: UPDATEPASSWORD,
    });
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

  return isgoogle ? (
    <div className={styles.page}>
      <div className={styles.infos}>
        <h2 className={styles.title}>User infos</h2>
        <Divider variant="middle" className={styles.divider} />
        <div></div>
        <img
          className={styles.imeg}
          //src="https://picsum.photos/400"
          src={
            user.avatar ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt=""
        ></img>
        <h3 className={styles.attributess}>Username</h3>
        <p className={styles.p}>{user.username}</p>
        <h3 className={styles.attributess}>Email</h3>
        <p className={styles.p}>{user.email}</p>
        <h3 className={styles.attributess}>Birthdate</h3>
        <p className={styles.p}>{Moment(user.birthdate).format("D/M/Y")}</p>
        <Button
          variant="outlined"
          color="Secondary"
          startIcon={<DeleteIcon />}
          onClick={doDelete}
        >
          Delete user
        </Button>
      </div>
      <div>
        <div className={styles.update}>
          <h2 className={styles.titleupdate}>Update infos</h2>

          <Divider variant="middle" className={styles.divider} />
          <form className={styles.form}>
            <TextField
              onChange={(e) =>
                setupdateData({ ...updateData, username: e.target.value })
              }
              label="Username"
              placeholder={user.username}
              type="text"
            />
            <p className={styles.warning}>{errors.username?.message} </p>
            <p>Upload your avatar</p>
            <div className={styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setupdateData({ ...updateData, avatar: base64 })
                }
              />
            </div>

            <Button
              variant="outlined"
              color="Primary"
              onClick={handleSubmit(doUpdate)}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.page}>
      <div className={styles.infos}>
        <h2 className={styles.title}>User infos</h2>
        <Divider variant="middle" className={styles.divider} />
        <div></div>
        <img
          className={styles.imeg}
          //src="https://picsum.photos/400"
          src={
            user.avatar ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt=""
        ></img>
        <h3 className={styles.attributess}>Username</h3>
        <p className={styles.p}>{user.username}</p>
        <h3 className={styles.attributess}>Email</h3>
        <p className={styles.p}>{user.email}</p>
        <h3 className={styles.attributess}>Birthdate</h3>
        <p className={styles.p}>{Moment(user.birthdate).format("D/M/Y")}</p>
        <Button
          variant="outlined"
          color="Secondary"
          startIcon={<DeleteIcon />}
          onClick={doDelete}
        >
          Delete user
        </Button>
      </div>
      <div>
        <div className={styles.update}>
          <h2 className={styles.titleupdate}>Update infos</h2>

          <Divider variant="middle" className={styles.divider} />
          <form className={styles.form}>
            <TextField
              onChange={(e) =>
                setupdateData({ ...updateData, username: e.target.value })
              }
              label="Username"
              placeholder={user.username}
              type="text"
            />
            {/*<TextField
            onChange={(e) => setupdateData({ ...updateData, email: e.target.value })}
            label="Email"
            placeholder={user.email}
            type="email"
          />
           <TextField
            value={birthdate}
            onChange={(e) => setbirthdate(e.target.value)}
            label="Birthdate"
            type="date"
            defaultValue={user.birthdate}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
            <p>Upload your avatar</p>
            <div className={styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setupdateData({ ...updateData, avatar: base64 })
                }
              />
            </div>

            <Button variant="outlined" color="Primary" onClick={doUpdate}>
              Update
            </Button>
          </form>
        </div>
        <div className={styles.reset}>
          <h2 className={styles.titlereset}>Reset password</h2>
          <form className={styles.form}>
            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Current password
              </InputLabel>

              <Input
                value={currentpassword}
                onChange={(e) => setcurrentpassword(e.target.value)}
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

            {/* <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm new password
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
          </FormControl> */}
            <Button
              variant="outlined"
              color="Primary"
              onClick={doUpdatepassword}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
