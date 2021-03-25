import { Avatar } from '@material-ui/core'
import React from 'react'
import './comments.css'
function CommentItem() {
    return (
        <div className="section">

        <div className="comment">
            <div className="post__header"> 
            <Avatar/>
            <div className="post__info">  
                    <h2>med habib dridi</h2>
                    <p>software dev</p>
              </div>
             </div>

             <div className="post__body"  >
                 <p>On recrute des développeurs C#/.net #junior #confirmé et #senior

                👉 Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn
            On recrute des développeurs C#/.net #junior #confirmé et #senior

               👉          Pour plus de détails , veuillez nous contacter par mail kimiy@es^rot.tn</p>
             </div>
        </div>
        </div>
    )
}

export default CommentItem
