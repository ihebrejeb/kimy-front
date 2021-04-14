import React, { useState } from "react";

import "./post.css";

import {
  Button,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createPosts } from "./ForumSlice";
import { red } from "@material-ui/core/colors";
import { Fragment } from "react";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const schema = yup.object().shape({
  text: yup.string().required("did you forget to write something ?"),
  title: yup.string().required("Please Submit A Thread Title"),

 
});
function AddPost() {
  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),

  });
  const [forumData, setforumData] = useState({ title: "", text: "" });
  const [openDialog, setOpenDialog] = React.useState(false);

  const clear = () => {
    setforumData({ title: "", text: "" });
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    clear()
    handleError()

  };
  const dispatch = useDispatch();

  // const handlechange = (e, editor) => {
  //   const text = editor.getData();
  //   forumData.text = text;
  // };
  

  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: "10px",
      margin: "auto",
      color:'red',
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 3000,
    },
    thebutton : {
      display: 'flex',
     
      marginBottom:'20px'
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const handleError = () => {
    errors.text = '';
    errors.title = '' 
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const submit = (e) => {
    dispatch(createPosts(forumData));
    clear();
    handleClick();
    setOpenDialog(false);
  };
  return (
    <div> 
      
    <div className={classes.thebutton}>
       <button variant="outlined" color="secondary" onClick={handleClickOpenDialog}>
            Post a Thread
       </button> 
   </div>  
    
    <Dialog
      fullWidth= {true}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
         >
     <DialogTitle id="form-dialog-title"> Ask A Question Below </DialogTitle>
        <DialogContent >


        
          <TextField
            fullWidth
            label="Title"
            {...register("title")}
            variant="outlined"
            value={forumData.title}
            onChange={(e) =>
              setforumData({ ...forumData, title: e.target.value })
            }
          />
     
        <p  className={classes.root} > {errors.title?.message } </p>
        <Fragment>
          {" "}
          <Typography variant="p" color="textprimary" component="p">
            <TextField
            fullWidth
            id="filled-basic"
            variant="outlined"
            label="Message"

            {...register("text")}
              value={forumData.text}
              onChange={(e) =>
                setforumData({ ...forumData, text: e.target.value })
              }
              
            />
            </Typography>
            <p className={classes.root} >
              {errors.text?.message } 
             </p>
             </Fragment>
        </DialogContent>
        
         
        <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        <button
           
            onClick={handleSubmit(submit)}
          >
            {" "}
            Submit Thread
          </button>
          </DialogActions>
        </Dialog> 
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Your Thread Has been Posted
            </Alert>
          </Snackbar>
        </div>      

          
          
         


          
       
    
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
  );
}

export default AddPost;
