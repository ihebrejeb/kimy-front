import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getViralPost,  selectViral } from './ForumSlice'
import HotThread from './HotThread'

function HotThreadList() {
    const dispatch = useDispatch()
    useEffect(() => {
     
        dispatch(getViralPost())
    }, [dispatch])
    const post = useSelector(selectViral)
    return (
        <div>
         

        {post?.map((forum)=> (
                 <div key={forum._id}>
        <HotThread post={forum}  />
        </div>))}
        </div>
    )
}

export default HotThreadList
