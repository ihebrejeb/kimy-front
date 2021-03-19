import React, { useState } from 'react'

import './post.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField } from '@material-ui/core';

function AddPost() {
    const [addPost, setaddPost] = useState('') ;
    // const [addedPost, setaddedPost] = useState(null)

    const handlechange =(e,editor) => {
        const data= editor.getData() ;
        setaddPost(data)
    }

    return (
        <div className="post">
            <h1 style={{marginBottom :' 30px'}}> Ask A Question Below </h1>
             <TextField id="filled-basic" label="Title" variant="outlined" />   
            <div className="editor"> 
            

            <CKEditor editor={ClassicEditor} data={addPost} onChange={handlechange} />
            </div>
        
            <button style={{ marginLeft :'0' , marginTop:'10px'}}> Submit Thread</button>
            {/* {addedPost ? addPost : ''} */}
        </div>
        
    )
    
}

export default AddPost
