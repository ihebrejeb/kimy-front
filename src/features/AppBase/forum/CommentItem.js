import { Avatar } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Removecomment } from './ForumSlice'

import './comments.css'
import { useParams } from 'react-router'
function CommentItem({comment, postId}) {
    const dispatch = useDispatch() ;
    let { id } = useParams();

    return (
        <div className="section">

        <div className="comment">
            <div className="post__header"> 
            <Avatar/>
            <div className="post__info">  
                    <h2>med habib dridi</h2>
                    
              </div>
             </div>

             <div className="post__bodfy"  >
                 <p>
            {comment.text}
             </p>
             <button  onClick={()=>dispatch(Removecomment(postId, comment._id)) }> Delete </button>
             </div>
        </div>
        </div>
    )
}

export default CommentItem
