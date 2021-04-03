import React from 'react'

import AddPost from '../features/AppBase/forum/AddPost';
import { getPosts } from '../features/AppBase/forum/ForumSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ForumList from '../features/AppBase/forum/ForumList';
import { useState } from 'react';
import'./forum.css'
function Forum() {
  // const history = useHistory() ;
  const dispatch = useDispatch()
  const [currentId, setcurrentId] = useState(null) ;

  useEffect(() => { 
    dispatch(getPosts()) ;
    
}, [ dispatch  ] ) 

  return (
    <div className="forum ">
      <div> </div>
      <AddPost/> 

      <ForumList setcurrentId={setcurrentId} />
   
     

    
          
    </div>
  )
}

export default Forum
