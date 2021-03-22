import React from 'react'
import Post from '../features/AppBase/forum/Post'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import InputOption from '../features/AppBase/forum/Input'
import './forum.css'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SearchIcon from '@material-ui/icons/Search';

import LastPageIcon from '@material-ui/icons/LastPage';
import { useHistory } from 'react-router';
import AddPost from '../features/AppBase/forum/AddPost';
function Forum() {
  const history = useHistory() ;
  return (
    <div className="forum ">
      <AddPost/> 
      <div className="bar"> 
    
      
      {/* <div className="rightside">  
      <div className="header__search">
                    <SearchIcon></SearchIcon>
                    <input placeholder="search here" type="text"/>
          </div>
          <div className="rightside">  

<InputOption Icon={ThumbUpOutlinedIcon}  title="Like"
             color="grey"/>
  <InputOption Icon={SortByAlphaIcon}  title="sort"
             color="grey"/>    
   <InputOption Icon={LastPageIcon}  title="previous"
             color="grey"/>  
   <InputOption Icon={FirstPageIcon}  title="next"
             color="grey"/>    
                 </div>        
                 

        
       </div> */}
    
      </div>
    
    <Post/>
    <Post/>
    <Post/>
          
    </div>
  )
}

export default Forum
