import React from 'react'

import AddPost from '../features/AppBase/forum/AddPost';
import { getPosts, selectForum } from '../features/AppBase/forum/ForumSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ForumList from '../features/AppBase/forum/ForumList';
function Forum() {
  // const history = useHistory() ;
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getPosts()) ;
    
}, [ dispatch  ] ) 

  return (
    <div className="forum ">
      <AddPost/> 

     <ForumList/>
   
     

    
          
    </div>
  )
}

export default Forum
