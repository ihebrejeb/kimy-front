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
import { auth } from '../Firebase';
import './Login.css'
import LiveQuizzComplete from './LiveQuizzComplete.js'
import styles from "./userprofile.module.css";
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@material-ui/core/';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

import { Button, Checkbox, Divider, FormControlLabel } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { deleteUser } from '../features/AppBase/actions/actioncrud';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    height:500,
    },
  }));

function LiveQuizz() {


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    function toNext() {
        console.log("tnonext")
        return(
            <div>
                <p>hello</p>
            </div>
        )
      };

    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

    

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('') 
  const [confirmpassword, setconfirmpassword] = useState('') 
  const [username, setusername] = useState('')
  const [birthdate, setbirthdate] = useState(new Date())
  const [avatar, setavatar] = useState('')
  const [profession, setprofession] = useState('')
  const user = useSelector(state => state.user.user);
  

  const dispatch = useDispatch() ;
    const history = useHistory();

  const register = (e) => {
      e.preventDefault(); 

      auth.createUserWithEmailAndPassword(
          email, 
          password
      ).then((authUser)  => {
          console.log(authUser)

      })
      .catch(error => {
          alert(error.message);

      }) ;
      
    
  };

 
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
 
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={modalStyle} className={classes.paper}>
    <form className={styles.form}>
    <p className={styles.p}>Start your live quizz</p>
    <TextField
    label="Question"
    type="text"  >
    </TextField>
    <TextField
    label="Option 1"
    type="text"  >
    </TextField>
    <TextField
    label="Option 2"
    type="text"  >
    </TextField>
    <TextField
    label="Option 3"
    type="text"  >
    </TextField>
    <TextField
    label="Option 4"
    type="text"  >
    </TextField>
    <TextField
    label="Option 5"
    type="text"  >
    </TextField>
    <Button variant="contained" color="default" onClick={handleOpen}>
        Ask
    </Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <LiveQuizzComplete></LiveQuizzComplete>
        </Modal>
    </form>
    </div>
    
  );
}

export default LiveQuizz;
