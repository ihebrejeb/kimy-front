import React from "react";
import AddPost from "../features/AppBase/forum/AddPost";
import { getPosts, getSortedWithLikes, searchThread } from "../features/AppBase/forum/ForumSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ForumList from "../features/AppBase/forum/ForumList";
import { useState } from "react";
import styles from './forum.module.css'
import Sidebar from "../features/AppBase/forum/Sidebar";

function Forum() {
  const dispatch = useDispatch();
  const [setcurrentId] = useState(null);
  var [title, setTitle] = useState('');
   var [sort, setsort] = useState(false)



  useEffect(() => {
    if (title !== '') {
        dispatch(searchThread(title));
    } else {
        dispatch(getPosts());
    }
}, [title , dispatch]);


useEffect(() => {
  if (sort === true) {
      dispatch(getSortedWithLikes());
  
  }
}, [ sort,  dispatch]);



  return (
    <div className={styles.forum}>
     <div className={styles.leftside}>
    

       
               
                <Sidebar setsort={setsort} title={title} setTitle={setTitle}/>

        </div>
   
    <div className={styles.forumList}>  
      <AddPost />
      <ForumList setcurrentId={setcurrentId} />
      </div>
      
      <div className={styles.fields}> 
     
     
            

     
    </div>
    </div>
  );
}

export default Forum;
