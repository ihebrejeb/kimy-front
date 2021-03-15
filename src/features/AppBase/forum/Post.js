import { Avatar } from '@material-ui/core'

import InputOption from './Input'
import './post.css'

import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

function Post ()  {
    return (
        <div  className="post">
            <div className="post__header"> 
            <Avatar/>
            <div className="post__info">  
                    <h2>med habib dridi</h2>
                    <p>software dev</p>
              </div>
             </div>

             <div className="post__body">
                 <p>On recrute des développeurs C#/.net #junior #confirmé et #senior

                👉 Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn
            On recrute des développeurs C#/.net #junior #confirmé et #senior

               👉          Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn</p>
             </div>
             <div className="post__buttons">
                 <InputOption Icon={ThumbUpOutlinedIcon}  title="Like"
                 color="blue"/>
                 
                   <InputOption Icon={ShareOutlinedIcon}  title="Share"
                 color="blue"/>
                
             </div>
        </div>
    )
}

export default Post
