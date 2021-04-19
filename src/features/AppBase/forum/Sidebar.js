import React from 'react'
import styles from './SideBar.module.css'
import SortIcon from '@material-ui/icons/Sort';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';


function Sidebar({setsort,setTitle  ,title}) {



    return (
        <div className={styles.side}>

            <div className={styles.Avatar}> 
                <Avatar src="https://c.files.bbci.co.uk/66CC/production/_116361362_tes1.png"/>
                <div className={styles.user}> Med habib Dridi </div>
                
            </div>

          <div className={styles.header__search}>
                    <SearchIcon></SearchIcon>
                    <input placeholder="Search  here" type="text"   value={title}
                                        onChange={e => setTitle(e.target.value )}
                                        className="px-16"
                                        disableUnderline
                                        fullWidth/>
                </div>

                <div className={styles.withicon}> 
                <RefreshIcon/>
           <div  className={styles.button} onClick={()=> setsort(false)}> Home</div>
           </div>
            <div className={styles.withicon}> 
            <SortIcon/>
           <div  className={styles.button} onClick={()=> setsort(true)}> Most Liked Threads </div>
           </div>
           <div className={styles.withicon}> 
            <RemoveRedEyeOutlinedIcon/>
           <div  className={styles.button} > Most viewed  Threads </div>
           </div>
           <div className={styles.withicon}> 
            <GradeIcon/>
           <div  className={styles.button} > Top rated Threads </div>
           </div>
           <div className={styles.withicon}> 
            <SettingsIcon/>
           <div  className={styles.button} > Settings </div>
           </div>
        </div>
    )
}

export default Sidebar
