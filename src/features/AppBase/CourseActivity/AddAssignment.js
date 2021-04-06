import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../CourseActivity/addActivity.module.css";
import { TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createAssignment, update } from "./AssignmentsSlice";
// import DateFnsUtils from '@date-io/date-fns';
// import 'date-fns';

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import { useHistory } from "react-router";
function AddAssignment({ currentId, setcurrentId }) {
  const assignment = useSelector((state) =>
    currentId
      ? state.assignments?.values.find((c) => c._id === currentId)
      : null
  );
  const history = useHistory();

  const [assignmentData, setassignmentData] = useState({
    title: "",
    activity: "",
    Assignmentfile: "",
    description: "",
    dateCreation: "",
    dateLimite: "",
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (currentId) setOpen(true);
  }, [currentId]);
  const handleClose = () => {
    clear();
    setOpen(false);
  };
  useEffect(() => {
    if (assignment) setassignmentData(assignment);
  }, [assignment]);

  const clear = () => {
    setcurrentId(null);
    setassignmentData({
      title: "",
    activity: "",
    Assignmentfile: "",
    description: "",
    dateCreation: "",
    dateLimite: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(update(currentId, assignmentData));
    } else {
      dispatch(createAssignment(assignmentData));
    }

    setOpen(false);
    clear();
  };
  return (
    <div>
      <button onClick={handleClickOpen}>create an assignment</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> </DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            noValidate
            className={styles.paper}
            onSubmit={handleSubmit}
          >
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              multiline
              rows={4}
              value={assignmentData.title}
              onChange={(e) =>
                setassignmentData({ ...assignmentData, title: e.target.value })
              }
            />
            <div className={styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setassignmentData({ ...assignmentData, file: base64 })
                }
              />
            </div>
            
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={assignmentData.description}
              onChange={(e) =>
                setassignmentData({
                  ...assignmentData,
                  description: e.target.value,
                })
              }
            />
             <TextField
    id="datetime-local"
    label="Deadline"
    type="datetime-local"
    defaultValue={Date.now()}
   
    InputLabelProps={{
      shrink: true,
    }}
  />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}

export default AddAssignment;
