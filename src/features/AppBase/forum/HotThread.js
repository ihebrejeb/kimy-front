import React from 'react'
import styles from './Hothread.module.css'
function HotThread() {
    return (
        <div className={styles.thread}>
            <div className={styles.notif}>
                     viral Thread  #1
            </div>
            <div className={styles.post}>
               
           <div className={styles.title}>hello and welcome to the forum Module
           
           </div>
            <div className={styles.details}> 
            <div> By med habib Dridi  </div>
            <div> 32 views  </div>
            <div>30 comments </div>
            <div> 20 likes   </div>

           
            </div>

           </div>
        </div>
    )
}

export default HotThread
