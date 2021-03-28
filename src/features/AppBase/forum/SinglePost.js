import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'
import CommentItem from './CommentItem'
import { getOnePost, selectPost } from './ForumSlice'
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import StarsIcon from '@material-ui/icons/Stars';
import { useParams } from "react-router";
import ReactHtmlParser from 'react-html-parser'
import './SingePost.css'
import moment from 'moment'
import {  Card , CardContent,   IconButton, makeStyles, Typography } from '@material-ui/core'
import { Fragment } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function SinglePost({ Posts}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 1960,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));
    const classes = useStyles();

    const post = useSelector(selectPost)
    const dispatch = useDispatch()
    let { id } = useParams();

    useEffect(() => { 
       
        dispatch(getOnePost(id)) 
       
    }, [ dispatch , id  ] ) 
    console.log(post)

    return (
<div> 
        <div className="post" >
            
           
           
          
             <Card className={classes.root}>
             <Typography style= {{padding:'20px'}} variant="h4" color="textprimary" component="h4">
                    {post.title}
                </Typography>
                <div className='items'> 
                 <p>  asked : {moment(post.date).format('MMMM Do YYYY')}  </p>  
                  <p className=''>  Owner : Med habib Dridi</p>
                </div>


            <CardContent>
            
           
                
                 <Fragment> <h3 className={classes.root}>
                 <Typography variant="h4" color="textprimary" component="h4">
                    {ReactHtmlParser(post.text)}
                </Typography>
                
                </h3>

                 
                </Fragment>
            </CardContent>           
                     <Link className='decoarion' to='/app/forum' >

                     <IconButton aria-label="view" >
                    <DynamicFeedIcon  /> all Posts
                    
                        
                    </IconButton> 
                    </Link>
                    <IconButton aria-label="view" >
                      <ThumbUpIcon/>  Like 
                         </IconButton>
                       
      

        </Card>

                 <div className="commentsection"></div>
              
           
        </div>
        
        {post?.comments?.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        <AddComment  postId={post._id}/>

        </div>
    )
}

export default SinglePost
