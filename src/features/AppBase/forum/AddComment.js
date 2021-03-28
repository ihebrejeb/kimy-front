import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { createComment } from './ForumSlice';
import { useState } from 'react';
import { useParams } from 'react-router';
import { TextField } from '@material-ui/core';

function AddComment({postId}) {
    const dispatch = useDispatch()
    const [CommentData, setCommentData] = useState()

    const submit = (e) => {
        e.preventDefault()
        dispatch(createComment(postId, {CommentData}))

    }
    return (
        <div style={{marginTop: '20 px'}}>
            <h3> Reply Here </h3>
            <TextField  value={CommentData} onChange={(e) => setCommentData( e.target.value )}  />
           <button onClick={submit} > send</button>
        </div>
    )
}

export default AddComment
