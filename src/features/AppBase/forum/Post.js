import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

import InputOption from "./Input";
import "./post.css";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";

import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GradeIcon from "@material-ui/icons/Grade";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { addLike, deletePost, unlike } from "./ForumSlice";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from '../Confirmation/ConfirmDialog'

import { Fragment } from "react";
import { useState } from "react";

function Post({ showActions, Posts, currentId }) {
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1000,
      marginBottom: "10px",
      margin: "auto",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  const classes = useStyles();

  const LIKE = (e) => {
    e.preventDefault();
    dispatch(addLike(Posts._id));
  };
  const UNLIKE = (e) => {
    e.preventDefault();
    dispatch(unlike(Posts._id));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon 
                                      onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this Thread?',
                                            subTitle: "You can't undo this operation",
                                             onConfirm: () => { dispatch(deletePost(Posts._id))}
                                        })
                                    }}
            />
          </IconButton>
        }
        title=" Med habib"
        subheader={moment(Posts.date).format("MMMM Do YYYY")}
      />

      <CardContent>
        <Typography variant="p" color="textprimary" component="p">
          {ReactHtmlParser(Posts.title)}
        </Typography>
        <Fragment>
          {" "}
          {showActions && (
            <div className="post__buttons">
              <IconButton aria-label="view" onClick={LIKE}>
                <InputOption
                  Icon={ThumbUpIcon}
                  title={Posts.like}
                  color="blue"
                />{" "}
              </IconButton>

              <IconButton aria-label="view" onClick={UNLIKE}>
                <InputOption Icon={ThumbDownIcon} title="" color="blue" />{" "}
              </IconButton>
              <IconButton aria-label="view">
                <InputOption
                  Icon={VisibilityIcon}
                  title={Posts.views}
                  color="blue"
                />
              </IconButton>
              <IconButton aria-label="view">
                <InputOption
                  Icon={GradeIcon}
                  title={Posts.avg.toFixed(1)}
                  color="blue"
                />
              </IconButton>
              <IconButton aria-label="view">
                <Link to={`/app/singlePost/${Posts._id}`}>
                  <InputOption
                    Icon={QuestionAnswerOutlinedIcon}
                    title={Posts.comments.length}
                    color="blue"
                  />
                  {/* { !auth.loading && user === auth.user._id } */}
                </Link>
              </IconButton>
            </div>
          )}
        </Fragment>
      </CardContent>
      <ConfirmDialog
     confirmDialog={confirmDialog}
     setConfirmDialog={setConfirmDialog}
 />
    </Card>
  );
}
Post.defaultProps = {
  showActions: true,
};
export default Post;
