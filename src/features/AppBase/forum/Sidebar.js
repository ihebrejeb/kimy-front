import React from 'react'
import styles from './SideBar.module.css'

function Sidebar({setsort}) {
  


    return (
        <div className={styles.side}>
           <div  className={styles.button} onClick={()=> setsort(true)}> Most Liked Threads </div>
           <div className={styles.button} > Most viewed Threads </div>
        </div>
    )
}

export default Sidebar
