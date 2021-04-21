import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleAssignment from "./SingleAssignment";
import {
  GetAssignments,
  getSortedAscendant,
  getSortedDescendant,
  searchThread,
} from "./AssignmentsSlice";
import ReplayIcon from "@material-ui/icons/Replay";

import { selectassignments } from "./AssignmentsSlice";
import { useEffect } from "react";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Dialog } from "@material-ui/core";
import styles from "./assignmentList.module.css";
import SearchPage from "../CourseActivity/SearchPage";
import SortAssignmentAsc from "./SortAssignmentAsc";
import SortassigmentsDesc from "./SortassigmentsDesc";

function AssignmentList({ setcurrentId }) {
  const dispatch = useDispatch();
  var [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  var [sort, setsort] = useState(false);
  var [sortdesc, setsortdesc] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    //clear();
    setOpen(false);
  };
  useEffect(() => {
    if (sort === true) {
      dispatch(getSortedAscendant());
    } else {
      dispatch(GetAssignments());
    }
  }, [sort, dispatch]);
  useEffect(() => {
    if (sortdesc === true) {
      dispatch(getSortedDescendant());
    } else {
      dispatch(GetAssignments());
    }
  }, [sortdesc, dispatch]);

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
        <div className={styles.listItem}>
          <SortAssignmentAsc setsort={setsort}></SortAssignmentAsc>
          <SearchPage setTitle={setTitle} title={title} />
        </div>
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
