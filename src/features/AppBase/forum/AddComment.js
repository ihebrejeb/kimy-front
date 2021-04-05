import React from 'react'

import { useDispatch } from 'react-redux';
import { createComment } from './ForumSlice';
import { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

function AddComment({postId}) {
    const dispatch = useDispatch()
    const [CommentData, setCommentData] = useState({text:''  })
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
       
      
      const clear = ( )=> {
        setCommentData({text:''})
      }
      
    const submit = (e) => {
        e.preventDefault()
        dispatch(createComment({postId, CommentData}))
        clear()
    }
    return (
        <div style={{marginTop: '20 px', backgroundColor:'white', width:'2Ovw', padding:'15px',paddingleft:'15px', marginBottom:'15px'}}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-amount"
            value={CommentData.text} 
            onChange={(e) => setCommentData( {...CommentData, text :e.target.value} )}
            startAdornment={<InputAdornment position="start">                
            <AccountCircle style={{color:'blue'}} />
            </InputAdornment>}
            labelWidth={30}
            placeholder='write a comment....'
            endAdornment={   <IconButton aria-label="view" onClick={submit} >  <SendIcon  style={{color:'blue'}}  />  </IconButton>        
            }
          />
        </FormControl>

        </div>
    )
}

export default AddComment
