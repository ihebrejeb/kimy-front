import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../Firebase';
import './Login.css'
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import './Login.css'
import styles from "./SignUp.module.css";


import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

import { Button, Checkbox, Divider, FormControlLabel } from "@material-ui/core";
function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('') 
  
  
    const history = useHistory();
    const signIn = (e) => {
        e.preventDefault();
  
        auth.signInWithEmailAndPassword(
          email, 
          password
    ).then((authUser)=> {
            console.log(authUser);
            history.push("/app/courses")
        }).catch((error)=> alert(error.message))
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
        <div className={styles.page}>
        <img
          className={styles.logo}
          src="./logo.png"
          alt="KIMY"
          onClick={() => history.push("/")}
        />
        <div className={styles.signIn}>
          <h2 className={styles.title}>Sign In with</h2>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <LinkedInIcon className={styles.linkedin}></LinkedInIcon>
            </div>
            <div className={styles.icon}>
              <GitHubIcon className={styles.github}></GitHubIcon>
            </div>
  
            <div className={styles.icon}>
              <TwitterIcon className={styles.twitter}></TwitterIcon>
            </div>
            <div className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="30px"
                height="30px"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </div>
          </div>
          <Divider variant="middle" className={styles.divider} />
          <p className={styles.or}>Or</p>
          <form className={styles.form}>
         
            <TextField
            value={email}
            onChange={e => setemail(e.target.value)} 
              label="Email" 
              placeholder="email" type="email" 
             
            />
            
            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
  
              <Input value={password} onChange={e => setpassword(e.target.value)} 
              
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
  
            <h5 style={{marginTop:'20px'}}>
            <span className={styles.signup_grey}>
              {" "}
              Forgot your Passord ?
            </span>

            <span className={styles.signup_link}   onClick={signIn}> Click Here </span>
          </h5>
  
            <Button variant="outlined" size="small" color="primary" onClick={signIn}   >
Login            </Button>
           
          </form>
        </div>
      </div>
    )
}

export default Login
