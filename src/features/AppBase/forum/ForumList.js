import React from 'react'
import { useSelector } from 'react-redux'
import { selectForum } from './ForumSlice'
import Post from './Post'
import styles from './ForumList.module.css'
function ForumList({setcurrentId}) {
    const Posts = useSelector(selectForum)
    return (
        <div className={styles.forum} >
             {Posts.map((forum)=> (
                 <div key={forum._id}>
      <Post Posts={forum} setCurrentId={setcurrentId}/>
      </div>
      ))}
        </div>
    )
}

export default ForumList
