import React from 'react'
import Post from '../features/AppBase/forum/Post'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import InputOption from '../features/AppBase/forum/Input'
import './forum.css'
import { TextField } from '@material-ui/core';
function Forum() {
  return (
    <div className="forum ">
      <div className="bar"> 
      <button> Create a thread</button> 
      <div className="rightside">  
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

      <InputOption Icon={ThumbUpOutlinedIcon}  title="Like"
                 color="blue"/>

        <input type="text"  placeholder="search"/>
       </div>
    
      </div>
    
    <Post/>
    <Post/>
    <Post/>
        
    </div>
  )
}

export default Forum
