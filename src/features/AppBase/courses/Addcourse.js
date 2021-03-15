import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './AddCourseStyles'
import FileBase from 'react-file-base64';

function Addcourse() {
    const classes= useStyles ;
    const [courseData, setcourseData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const handleSubmit = () => {

    }
    const clear = () => {

    }
    return (
    
           <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> 'Creating a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={courseData.creator} onChange={(e) => setcourseData({ ...courseData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={courseData.title} onChange={(e) => setcourseData({ ...courseData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={courseData.message} onChange={(e) => setcourseData({ ...courseData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={courseData.tags} onChange={(e) => setcourseData({ ...courseData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setcourseData({ ...courseData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    )
}

export default Addcourse
