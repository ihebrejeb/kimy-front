import React from 'react'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'
import CommentItem from './CommentItem'
import Post from './Post'

function SinglePost() {
    return (
        <div>
            <Link to='/app/forum' >
            <button>
                back to all posts
            </button>
            </Link>

            <Post showActions={false}/>

            <CommentItem/>


            
            <AddComment/>

           
     
        </div>
    )
}

export default SinglePost
