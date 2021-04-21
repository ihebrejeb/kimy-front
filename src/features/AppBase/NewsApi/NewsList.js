import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import NewsItem from './NewsItem'
function NewsList() {

    const [articles, setarticles] = useState([])

    useEffect(() => {
        const GetArticles = async()=> {
            const res = await Axios.get("https://newsapi.org/v2/top-headlines?country=fr&category=technology&pageSize=2&apiKey=36aa59f256e649d88c9a9736b7c5d4d1");
            console.log(res)
            setarticles(res.data.articles)

        };
        GetArticles()
        
    }, [])
    return (
        <div>
            {articles.map(({title , description , url , urlToImage}) => (
                <NewsItem title={title} description={description} url={url} urlToImage={urlToImage} />
            ))}
        </div>
    )
}

export default NewsList
