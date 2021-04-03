import React, { useState } from 'react'

import './post.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card, CardContent, CardHeader, IconButton, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPosts } from './ForumSlice';
import { red } from '@material-ui/core/colors';
import { Fragment } from 'react';
import { Alert } from '@material-ui/lab';

function AddPost() {
    const [forumData, setforumData] = useState({ title :'' , text:''})
    const clear =()=> {

        setforumData({ title:'' , text:''})
    }
    const { title } = forumData;

    const dispatch = useDispatch();

    const handlechange =(e,editor) => {
        const text= editor.getData() ;
        forumData.text = text ;
        
    }
    const handleSbumit= (e) => {
        e.preventDefault()
        dispatch(createPosts(forumData))
        clear();
        handleClick()
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 800,
            marginBottom:'10px',
            margin:'auto'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    return (
        <Card className={classes.root}>
                 
        <CardHeader
          
            action={ 
                <IconButton aria-label="settings">
                  
                </IconButton>
            }
            title=' Ask A Question Below'
            subheader='Thread'
        />
       
        <CardContent>
        
            <Typography variant="p" color="textprimary" component="p">
            <TextField id="filled-basic" label="Title" variant="outlined"  value={forumData.title} onChange={(e) => setforumData({ ...forumData, title: e.target.value })}/> 
            </Typography>
             <Fragment> <h3 className={classes.root}>
             <CKEditor editor={ClassicEditor} value={forumData.text} onChange={handlechange}  />
            </h3>

            <button style={{ marginLeft :'0' , marginTop:'10px'}} onClick={handleSbumit}> Submit Thread</button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
     Your Thread Has been Posted
  </Alert>
</Snackbar>
            </Fragment>
        </CardContent>
   
    </Card>
        // <div className="post">
        //     <h1 style={{marginBottom :' 30px'}}> Ask A Question Below </h1>
            
        //      <TextField id="filled-basic" label="Title" variant="outlined"  value={forumData.title} onChange={(e) => setforumData({ ...forumData, title: e.target.value })}/>   
        //     <div className="editor"> 
        //     {/* <TextField id="filled-basggic" label="text" variant="outlined"  value={forumData.text} onChange={(e) => setforumData({ ...forumData, text: e.target.value })}/>    */}


        //     <CKEditor editor={ClassicEditor} value={forumData.text} onChange={handlechange}  />
        //     </div>
        
        //     <button style={{ marginLeft :'0' , marginTop:'10px'}} onClick={handleSbumit}> Submit Thread</button>
        //     {/* {addedPost ? addPost : ''} */}
        // </div>
        
    )
    
}

export default AddPost
