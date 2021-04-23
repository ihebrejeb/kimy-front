import React from "react";
import AddPost from "../features/AppBase/forum/AddPost";
import { getPosts,  searchThread } from "../features/AppBase/forum/ForumSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ForumList from "../features/AppBase/forum/ForumList";
import { useState } from "react";
import styles from './forum.module.css'
import Sidebar from "../features/AppBase/forum/Sidebar";
import Tags from "../features/AppBase/forum/Tags";
import OnlineUsers from "../features/AppBase/forum/OnlineUsers";
import HotThread from "../features/AppBase/forum/HotThread";
import NewsList from "../features/AppBase/NewsApi/NewsList";
import NewsLeftSide from "../features/AppBase/NewsApi/NewsLeftSide";
import HotThreadList from "../features/AppBase/forum/HotThreadList";

function Forum() {
  const dispatch = useDispatch();
  const [setcurrentId] = useState(null);
  var [title, setTitle] = useState('');
 
  const users = useSelector(state => state.users.userslist.users)


  useEffect(() => {
    if (title !== '') {
        dispatch(searchThread(title));
    } else {
        dispatch(getPosts());
    }
}, [title , dispatch]);



  return (
    <div className={styles.forum}>
     <div className={styles.leftside}>
    

       
         <AddPost />

                <Sidebar title={title} setTitle={setTitle} users={users} />
                <Tags/>
                <NewsLeftSide/>
        </div>
   
    <div className={styles.forumList}>  
      <ForumList setcurrentId={setcurrentId} />
      </div>
      
      <div className={styles.fields}> 
     
      <OnlineUsers/>
      <HotThreadList/>
      <NewsList/>

     
    </div>
    </div>
  );
}

export default Forum;
