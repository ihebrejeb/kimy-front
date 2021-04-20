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
import {
  createnewAssignment,
  GetAssignments,
  updateAssign,
} from "./AssignmentsSlice";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router";
function SingleAssignment({ currentIdassign, assignmentActivity }) {
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
  return (
    <div>
      <div onClick={handleClickOpen}>
        <AssignmentIcon />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
export default SingleAssignment;
