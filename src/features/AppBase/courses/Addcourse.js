import {  TextField } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import styles from './addcourse.module.css'

function Addcourse() {
  

    const [courseData, setcourseData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();

    const handleSubmit = () => {

    }
    const clear = () => {

    }
    return (
    
  
      <form  autoComplete="off" noValidate className={styles.paper}  onSubmit={handleSubmit}>
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="creator" variant="outlined" label="Creator" fullWidth value={courseData.creator} onChange={(e) => setcourseData({ ...courseData, creator: e.target.value })} />
        <TextField  InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="title" variant="outlined" label="Title" fullWidth value={courseData.title} onChange={(e) => setcourseData({ ...courseData, title: e.target.value })} />
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }} name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={courseData.message} onChange={(e) => setcourseData({ ...courseData, message: e.target.value })} />
        <TextField InputLabelProps={{ className :styles.text }}  InputProps={{ className :styles.field }}  name="tags" variant="outlined" label="Tags "  value={courseData.tags} onChange={(e) => setcourseData({ ...courseData, tags: e.target.value.split(',') })} />
        <div className={styles.upload} ><FileBase type="file" multiple={false} onDone={({ base64 }) => setcourseData({ ...courseData, selectedFile: base64 })} /></div>
        <div className={styles.buttons}>  
            
        <button    type="submit" >Submit</button>
        <button className={styles.clean} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</button>
        </div>
      
      </form>
    
    )
}

export default Addcourse
