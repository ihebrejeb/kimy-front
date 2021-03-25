import React, { useState } from 'react'

import './post.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPosts } from './ForumSlice';

function AddPost() {
    const [forumData, setforumData] = useState({ title :'' , text:''})

    const { title } = forumData;

    const dispatch = useDispatch();

    const handlechange =(e,editor) => {
        const text= editor.getData() ;
        forumData.text = text ;
        
    }
    const handleSbumit= (e) => {
        e.preventDefault()
        dispatch(createPosts(forumData))
    }

   

    return (
        <div className="post">
            <h1 style={{marginBottom :' 30px'}}> Ask A Question Below </h1>
            
             <TextField id="filled-basic" label="Title" variant="outlined"  value={forumData.title} onChange={(e) => setforumData({ ...forumData, title: e.target.value })}/>   
            <div className="editor"> 
            {/* <TextField id="filled-basggic" label="text" variant="outlined"  value={forumData.text} onChange={(e) => setforumData({ ...forumData, text: e.target.value })}/>    */}


            <CKEditor editor={ClassicEditor} value={forumData.text} onChange={handlechange}  />
            </div>
        
            <button style={{ marginLeft :'0' , marginTop:'10px'}} onClick={handleSbumit}> Submit Thread</button>
            {/* {addedPost ? addPost : ''} */}
        </div>
        
    )
    
}

export default AddPost
