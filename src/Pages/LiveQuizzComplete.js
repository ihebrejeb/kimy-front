import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from '../Firebase';
import './Login.css'
import styles from "./userprofile.module.css";
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


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
      overflow:'scroll',
    height:500,
    },
  }));

function LiveQuizzComplete() {


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <h1>Your question</h1>
    <h2>Answers: 14</h2>
    {/* <Button variant="contained" color="default" onClick={handleOpen}>
        Show answers
    </Button> */}
    
        <hr></hr>
        <p>ahmed</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>user2</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>Chucky</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>amin</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>iheb</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>yasmin</p>
        <p>Answer: a</p>
        <p>Chucky</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>amin</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>iheb</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>yasmin</p>
        <p>Answer: a</p>
    </form>
    </div>
    
  );
}

export default LiveQuizzComplete;
