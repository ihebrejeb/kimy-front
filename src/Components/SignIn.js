import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { useHistory } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';import './signIn.css' ;
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { AccountCircle } from '@material-ui/icons';
import { Button, Checkbox } from '@material-ui/core';
function SignIn() {
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        margin: {
          margin: theme.spacing(1),
        },
        withoutLabel: {
          marginTop: theme.spacing(3),
        },
        textField: {
          width: '25ch',
        },
      }));
      const classes = useStyles();
      const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
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
        <div className="signIn_page">
            <img className="logo" src="./logo.png" alt="KIMY"  onClick={()=> history.push('/')} />
               <div className="signIn">
                    <h2>Sign Up with</h2>
                   
                  <div className="iconss"> 
                            <LinkedInIcon className="icons"/>
                            <GitHubIcon className="icons"></GitHubIcon>
                            <TwitterIcon />
                  
                  </div> 
                 
            <div className="form">
             <form>
                    <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Email"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                />
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
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
                <div className="tos"> 
                <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    
                />
                <p>I agree to terms and conditions</p> </div>

                <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                         Sign Up
                 </Button>
                     <h5>
                    
                    <span className="signup_grey"> Do you already have an account ?</span>   
                    
                    <span className="signup_link"  >  LogIn </span>
                    </h5>
             </form>
            </div>
         </div>
        </div>
    )
}

export default SignIn
