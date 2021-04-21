import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Hothread.module.css'
function HotThread({post}) {
   
    return (
        <Link to={`/app/singlePost/${post._id}`} style={{ textDecoration: 'none' }}>
           
              
        <div className={styles.thread}>
            <div className={styles.notif}>
                     viral Thread  #1
            </div>
            <div className={styles.post}>
               
           <div className={styles.title}>{post.title}
           
           </div>
            <div className={styles.details}> 
            <div> By med habib Dridi  </div>
            <div className={styles.info}>
            <div> likes {post.like}  </div>
            <div> comments :{post.comments.length}</div>
            <div> views : {post.views}   </div>
            </div>
           
            </div>

           </div>
        </div>
        </Link>
    )
}

export default HotThread
