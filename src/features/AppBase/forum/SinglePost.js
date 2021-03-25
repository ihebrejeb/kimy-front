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
            <h1 style={{marginTop:'30px'}}> FULL STACK DEV OFFER FOR A JUNIOR DEV</h1>
            <Post showActions={false}/>
                 <div className="commentsection"></div>
                <h2> Latest Answers </h2>
            <CommentItem/>
            <CommentItem/>
            <CommentItem/>



            
            <AddComment/>

           
     
        </div>
    )
}

export default SinglePost
