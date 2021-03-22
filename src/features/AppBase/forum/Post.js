import { Avatar } from '@material-ui/core'

import InputOption from './Input'
import './post.css'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { useHistory } from 'react-router';
function Post ({showActions})  {

   const history = useHistory();
    return (
        <div  className="post" >
            <div className="post__header"> 
            <Avatar/>
            <div className="post__info">  
                    <h2>med habib dridi</h2>
                    <p>software dev</p>
              </div>
             </div>

             <div className="post__body" onClick={() => history.push("/app/singlePost")} >
                 <p>On recrute des développeurs C#/.net #junior #confirmé et #senior

                👉 Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn
            On recrute des développeurs C#/.net #junior #confirmé et #senior

               👉          Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn</p>
             </div>
             {showActions  &&
             <div className="post__buttons">
                 <InputOption Icon={ThumbUpIcon}  title="Like"
                 color="blue"/>
                 
                   <InputOption Icon={ThumbDownIcon}  title="dislike"
                 color="blue"/>
                   <InputOption Icon={VisibilityIcon}  title="views"
                 color="blue"/>
                   <InputOption Icon={GradeIcon}  title="Rating"
                 color="blue"/>
                 <InputOption  Icon={QuestionAnswerOutlinedIcon}  title="Comments"
                 color="blue"/>
                 {/* { !auth.loading && user === auth.user._id } */}
                  <InputOption Icon={DeleteOutlineOutlinedIcon}  title="Delete"
                 color="blue"/>
                
             </div> }

          
        </div>
    )
}
Post.defaultProps = {
    showActions: true,
    
}
export default Post
