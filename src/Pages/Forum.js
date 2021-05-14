import React from "react";
import AddPost from "../features/AppBase/forum/AddPost";
import { getPosts, searchThread } from "../features/AppBase/forum/ForumSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ForumList from "../features/AppBase/forum/ForumList";
import { useState } from "react";
import styles from "./forum.module.css";
import Sidebar from "../features/AppBase/forum/Sidebar";
import Tags from "../features/AppBase/forum/Tags";
import OnlineUsers from "../features/AppBase/forum/OnlineUsers";
// import HotThread from "../features/AppBase/forum/HotThread";
import NewsList from "../features/AppBase/NewsApi/NewsList";
import NewsLeftSide from "../features/AppBase/NewsApi/NewsLeftSide";
import HotThreadList from "../features/AppBase/forum/HotThreadList";
import { useHistory, useParams } from "react-router";
import { selectedcourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";
function Forum() {
  const dispatch = useDispatch();
  const [setcurrentId] = useState(null);
  var [title, setTitle] = useState("");
  let { courseid } = useParams();
  const course = useSelector(selectedcourse);
  const history = useHistory();

  useEffect(() => {
    if (title !== "") {
      dispatch(searchThread(title, courseid));
    } else {
      dispatch(getPosts(courseid));
    }
  }, [title, dispatch, courseid]);
  useEffect(() => {
    if (!course._id) {
      history.push("/app");
    }
  }, [course._id, history]);

  return (
    <div className={styles.forum}>
      <div className={styles.leftside}>
        <AddPost />

        <Sidebar title={title} setTitle={setTitle} courseid={courseid} />
        <Tags />
        <NewsLeftSide />
      </div>

      <div className={styles.forumList}>
        <ForumList setcurrentId={setcurrentId} />
      </div>

      <div className={styles.fields}>
        <OnlineUsers />
        <HotThreadList courseid={courseid} />
        <NewsList />
      </div>
    </div>
  );
}

export default Forum;
