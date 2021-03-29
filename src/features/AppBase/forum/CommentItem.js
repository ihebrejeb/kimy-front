import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Removecomment } from './ForumSlice'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import './comments.css'
import { useParams } from 'react-router'
import moment from 'moment';
function CommentItem({comment, postId}) {
    const dispatch = useDispatch() ;

    return (
        <div className="section">

        <div className="comment">
            <div className="post__header"> 
            <Avatar/>
            <div className="post__info">  
                    <h2>med habib dridi</h2>
                    {moment(comment.date).format('MMMM Do YYYY')}
                    
              </div>
             </div>

             <div className="body"  >
                 <h4>
            {comment.text}
             </h4> <IconButton aria-label="view" >

             <DeleteOutlineOutlinedIcon style={{color:'blue'}}  onClick={()=>dispatch(Removecomment(postId, comment._id)) } />
             </IconButton>
             </div>
        </div>
        </div>
    )
}

export default CommentItem
