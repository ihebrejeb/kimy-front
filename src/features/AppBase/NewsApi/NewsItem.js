import React from 'react'
import styles from './news.module.css'
function NewsItem({title , description , url , urlToImage}) {
    return (
        <div className={styles.card}>

            <img className={styles.image} src={urlToImage} alt=""/>
            <a className={styles.link} href={url}> {title} </a> 


            
            <div className={styles.description}> {description}</div>
        </div>
    )
}

export default NewsItem
