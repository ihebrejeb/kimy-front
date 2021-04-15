import React from 'react'
import styles from './Tags.module.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Tags() {


    const recentItem = (topic) => (
        <div className={styles.sidebar_recentItem}>
        <span className={styles.hash}>#</span>
        <div className={styles.topic}>{topic}</div>
        </div>
    )
    return (
        <div className={styles.tags}>
           <div> 
                <p className={styles.title}> Suggested Topics</p>
               {recentItem('node js ')}
               {recentItem('angular ')}
               {recentItem('react')}
               {recentItem('react')}
               {recentItem('react')}
                <div className={styles.more}> 
               <div className={styles.moretext} > Show More </div>
               <ArrowDropDownIcon/>

               </div>
            </div> 
        </div>
    )
}

export default Tags
