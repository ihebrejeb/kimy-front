import React from 'react'
import { useSelector } from 'react-redux'
import { selectForum } from './ForumSlice'
import Post from './Post'

function ForumList({setcurrentId}) {
    const Posts = useSelector(selectForum)
    return (
        <div>
             {Posts.map((forum)=> (
                 <div key={forum._id}>
      <Post Posts={forum} setCurrentId={setcurrentId}/>
      </div>
      ))}
        </div>
    )
}

export default ForumList
