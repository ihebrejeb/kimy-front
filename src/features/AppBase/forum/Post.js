import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'

import InputOption from './Input'
import './post.css'
import { Link } from 'react-router-dom'
import { red } from '@material-ui/core/colors';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GradeIcon from '@material-ui/icons/Grade';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { useHistory } from 'react-router';
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deletePost, selectPost, updatelikes } from './ForumSlice';
import moment from 'moment'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Fragment } from 'react';

function Post ({showActions , Posts, currentId })  {
   const dispatch = useDispatch()
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 665,
            marginBottom:'10px',
            margin:'auto'
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

    
    const LIKE =(e) => {
       e.preventDefault()
       dispatch(addLike(Posts._id))
    }

    return (
        
             <Card className={classes.root}>
                 
            <CardHeader
                avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                        </Avatar>

                }
                action={ 
                    <IconButton aria-label="settings">
                      
                      <MoreVertIcon onClick={()=> dispatch(deletePost(Posts._id))} />
                    </IconButton>
                }
                title=' Med habib'
                subheader={moment(Posts.date).format('MMMM Do YYYY')}
            />
           
            <CardContent>
            
                <Typography variant="p" color="textprimary" component="p">
                    {ReactHtmlParser(Posts.title)}
                </Typography>
                 <Fragment> <h3 className={classes.root}>
                    
                </h3>

                    
                    {showActions  &&
             <div className="post__buttons">
                <IconButton aria-label="view"  onClick={LIKE}>
                    
                 <InputOption Icon={ThumbUpIcon}  title=  {Posts.like}

                
                color="blue"    / > </IconButton>
                
                 <IconButton aria-label="view" >
                     
                   <InputOption Icon={ThumbDownIcon}  title=""
                 color="blue"/> </IconButton>
                 <IconButton aria-label="view" >
                   <InputOption Icon={VisibilityIcon}  title={Posts.views}
                 color="blue"/></IconButton>
                 <IconButton aria-label="view" >
                   <InputOption Icon={GradeIcon}  title={Posts.avg}
                 color="blue"/></IconButton>
                 <IconButton aria-label="view" >
                   <Link to={`/app/singlePost/${Posts._id}`}> 
                 <InputOption  Icon={QuestionAnswerOutlinedIcon}  title={Posts.comments.length }

                 color="blue"/> 
                 {/* { !auth.loading && user === auth.user._id } */}
                 </Link></IconButton> 
             </div> }
                </Fragment>
            </CardContent>
       
        </Card>
            

          
    )
}
Post.defaultProps = {
    showActions: true,
    
}
export default Post
