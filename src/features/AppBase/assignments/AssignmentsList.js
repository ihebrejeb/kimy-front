import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleAssignment from "./SingleAssignment";
import { GetAssignments, searchThread } from "./AssignmentsSlice";

import { selectassignments } from "./AssignmentsSlice";
import { useEffect } from "react";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Dialog } from "@material-ui/core";
import styles from "./assignmentList.module.css";
import SearchPage from "../CourseActivity/SearchPage";
function AssignmentList({ setcurrentId }) {
  const dispatch = useDispatch();
  var [title, setTitle] = useState("");

  useEffect(() => {
    if (title !== "") {
      dispatch(searchThread(title));
    } else {
      dispatch(GetAssignments());
    }
  }, [title, dispatch]);
  //const classes = useStyles;
  const assignmentact = useSelector(selectassignments);
  console.log(selectassignments);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    //clear();
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <div onClick={handleClickOpen}>
        {" "}
        <AssignmentOutlinedIcon
          className={styles.button_assignment}
        ></AssignmentOutlinedIcon>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <SearchPage setTitle={setTitle} title={title} />
        Assignments
        {assignmentact?.map((assignmentactivity) => (
          <SingleAssignment
            key={assignmentactivity._id}
            assignmentact={assignmentactivity}
            setcurrentId={setcurrentId}
          />
        ))}
      </Dialog>
    </div>
  );
}

export default AssignmentList;
