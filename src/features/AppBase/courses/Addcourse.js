import {  TextField } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import styles from './addcourse.module.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createCourse } from './CoursesSlice';
function Addcourse() {


    const [courseData, setcourseData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault() ; 
    dispatch(createCourse(courseData)) ;
    setOpen(false);


    }
    




    return (
      <div> 
      <button variant="outlined" color="secondary" onClick={handleClickOpen}>
      Create Your own  course
     </button>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title"> </DialogTitle>
       <DialogContent>

       <form  autoComplete="off" noValidate className={styles.paper}  onSubmit={handleSubmit}>
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="creator" variant="outlined" label="Creator" fullWidth value={courseData.creator} onChange={(e) => setcourseData({ ...courseData, creator: e.target.value })} />
        <TextField  InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="title" variant="outlined" label="Title" fullWidth value={courseData.title} onChange={(e) => setcourseData({ ...courseData, title: e.target.value })} />
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }} name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={courseData.message} onChange={(e) => setcourseData({ ...courseData, message: e.target.value })} />
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="tags" variant="outlined" label="Tags "  value={courseData.tags} onChange={(e) => setcourseData({ ...courseData, tags: e.target.value.split(',') })} />
        <div className={styles.upload} ><FileBase type="file" multiple={false} onDone={({ base64 }) => setcourseData({ ...courseData, selectedFile: base64 })} /></div>
        
      
      </form>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <button  onClick={handleSubmit}  type="submit" >Submit</button>

       </DialogActions>
     </Dialog>
     </div>
  
      
    
    )
}

export default Addcourse
