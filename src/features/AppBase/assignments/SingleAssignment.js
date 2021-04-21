import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../assignments/addAssignment.module.css";
import { TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import {
  createnewAssignment,
  GetAssignments,
  updateAssign,
} from "./AssignmentsSlice";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router";
import CourseActivity from "../CourseActivity/CourseActivity";
import AssignmentList from "./AssignmentsList";
import styless from "./assignmentList.module.css";
function SingleAssignment({ currentIdassign, assignmentact }) {
  const assignment = useSelector((state) =>
    currentIdassign
      ? state.assignments?.values.find((c) => c._id === currentIdassign)
      : null
  );
  useEffect(() => {
    if (currentIdassign) setOpen(true);
  }, [currentIdassign]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // clear();
    setOpen(false);
  };
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "105%",
      maxWidth: 900,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      {" "}
      <List style={{ width: 400 }} Scrollable={false}>
        <ListItem className={classes.root}>
          <div className={styless.listItem}>
            <ListItemText primary={assignmentact.title} />
            <span className={styless.text_assignment}>
              {assignmentact.dateLimite}
            </span>
          </div>
        </ListItem>{" "}
      </List>
    </div>
  );
}
export default SingleAssignment;
