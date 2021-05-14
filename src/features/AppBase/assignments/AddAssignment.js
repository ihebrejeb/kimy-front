import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../assignments/addAssignment.module.css";
import { TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {
  createnewAssignment,
  GetAssignments,
  updateAssign,
} from "./AssignmentsSlice";

import { useHistory } from "react-router";
import { useParams } from "react-router";

function AddAssignment({ currentIdassign, setcurrentIdassign, activityid }) {
  //activityid = useParams();

  const assignment = useSelector((state) =>
    currentIdassign
      ? state.assignments?.values.find((c) => c._id === currentIdassign)
      : null
  );
  const history = useHistory();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState([]);

  const [assignmentData, setassignmentData] = useState({
    title: "",
    related_activity: "",
    Assignmentfile: "",
    description: "",
    dateCreation: Date.now(),
    dateLimite: "",
    activity: activityid,
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  // useEffect(() => {
  //   let unmounted = false;

  //   async function getCharacters() {
  //     const response = await fetch("http://floating-cliffs-13024.herokuapp.com/activity");
  //     const body = await response.json();
  //     console.log(body);
  //     if (!unmounted) {
  //       setItems(body.data.map(({ title }) => ({ title: title })));
  //       setLoading(false);
  //     }
  //   }
  //   getCharacters();
  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);
  useEffect(() => {
    if (currentIdassign) setOpen(true);
  }, [currentIdassign]);
  const handleClose = () => {
    clear();
    setOpen(false);
  };
  useEffect(() => {
    if (assignment) setassignmentData(assignment);
  }, [assignment]);

  const clear = () => {
    //setcurrentIdassign(null);
    setassignmentData({
      title: "",
      related_activity: "",
      Assignmentfile: "",
      description: "",
      dateCreation: "",
      dateLimite: "", //controle de saisie superieure l data lyouma
    });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();

    dispatch(createnewAssignment(assignmentData));

    ///console.log(assignmentData);

    setOpen(false);
    clear();
  };
  return (
    <div>
      <NoteAddIcon onClick={handleClickOpen}>create an assignment</NoteAddIcon>
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
            // onSubmit={sendEmail}
          >
            {/* <select
              value={assignmentData.activityid}
              onChange={(e) =>
                setassignmentData({
                  ...assignmentData,
                  activityid: e.target.value,
                })
              }
            >
              {items.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select> */}

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
                value={assignmentData.Assignmentfile}
                onDone={({ base64 }) =>
                  setassignmentData({
                    ...assignmentData,
                    Assignmentfile: base64,
                  })
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
              min="Date.now()"
              id="date"
              label="Deadline"
              type="date"
              name="dateLimite"
              value={assignmentData.dateLimite}
              onChange={(e) =>
                setassignmentData({
                  ...assignmentData,
                  dateLimite: e.target.value,
                })
              }
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
