import { Avatar } from '@material-ui/core'
import React from 'react'
import styles from './OnlineUsers.module.css'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
function OnlineUsers() {
    return (
        <div className={styles.List}>
            <h2 className={styles.title}> Online Students</h2>
            <div className={styles.userList}>
            <div className={styles.connectedList}> 
                <div className={styles.Avatar}>
                <Avatar src="https://c.files.bbci.co.uk/66CC/production/_116361362_tes1.png"/>
               
                <div className={styles.user}> Med habib Dridi </div>
                </div>
                
                <div className={styles.online}>
                    <FiberManualRecordIcon/>
                </div>
                
                
            </div>
            <div className={styles.connectedList}> 
                <div className={styles.Avatar}>
                <Avatar src="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455"/>
               
                <div className={styles.user}> Iheb Rejeb </div>
                </div>
                <div className={styles.online}>
                    <FiberManualRecordIcon/>
                </div>
                
            </div>
            <div className={styles.connectedList}> 
                <div className={styles.Avatar}>
                <Avatar src="http://www.gstatic.com/tv/thumb/persons/336/336_v9_bf.jpg"/>
               
                <div className={styles.user}>Khaoula Khmiri </div>
                </div>
                <div className={styles.online}>
                    <FiberManualRecordIcon/>
                </div>
                
            </div>
            

            </div>
        </div>
    )
}

export default OnlineUsers
