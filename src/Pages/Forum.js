import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import AddPost from "../features/AppBase/forum/AddPost";
import { getPosts, searchThread } from "../features/AppBase/forum/ForumSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ForumList from "../features/AppBase/forum/ForumList";
import { useState } from "react";
import styles from './forum.module.css'

function Forum() {
  const dispatch = useDispatch();
  const [setcurrentId] = useState(null);
  const [title, setTitle] = useState(''
   
);


  useEffect(() => {
    if (title !== '') {
        dispatch(searchThread(title));
    } else {
        dispatch(getPosts());
    }
}, [title , dispatch]);

  return (
    <div className={styles.forum}>
      <div className={styles.fields}> 
      <AddPost />
      <div className={styles.header__search}>
                    <SearchIcon></SearchIcon>
                    <input placeholder="Search  here" type="text"   value={title}
                                        onChange={e => setTitle(e.target.value )}
                                        className="px-16"
                                        disableUnderline
                                        fullWidth/>
                </div>
     
      

     
    </div>
      <ForumList setcurrentId={setcurrentId} />
    </div>
  );
}

export default Forum;
