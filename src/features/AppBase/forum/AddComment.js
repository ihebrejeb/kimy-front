import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddComment() {
    const submit = () => {

    }
    return (
        <div>
            <h2>Your Answer </h2>
            <CKEditor editor={ClassicEditor} onClick={submit}  />
           
        </div>
    )
}

export default AddComment
