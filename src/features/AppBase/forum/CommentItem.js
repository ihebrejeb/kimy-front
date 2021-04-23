import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Removecomment } from "./ForumSlice";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "./comments.css";
import moment from "moment";
import ConfirmDialog from '../Confirmation/ConfirmDialog'
import { useState } from "react";

function CommentItem({ comment, postId }) {
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  return (
    <div className="section">
      <div className="comment">
        <div className="post__header">
          <Avatar />
          <div className="post__info">
            <h2>med habib dridi</h2>
            {moment(comment.date).format("MMMM Do YYYY")}
          </div>
        </div>

        <div className="body">
          <h4>{comment.text}</h4>{" "}
          <IconButton aria-label="view">
            <DeleteOutlineOutlinedIcon
              style={{ color: "blue" }}
              onClick={() => {
                setConfirmDialog({
                    isOpen: true,
                    title: 'Are you sure to delete this Comment?',
                    subTitle: "You can't undo this operation",
                     onConfirm: () => {dispatch(Removecomment(postId, comment._id))}
                })
              }}
         
            />
          </IconButton>
        </div>
      </div>
      <ConfirmDialog
     confirmDialog={confirmDialog}
     setConfirmDialog={setConfirmDialog}
 />
    </div>
  );
}

export default CommentItem;
