import React from "react";
import { useSelector } from "react-redux";
import SignleAssignment from "./SingleAssignment";

import { selectassignments } from "./AssignmentsSlice";
import styles from "../CourseActivity/CourseActivityList.module.css";
//import useStyles from "./ListStyles";

function AssignmentList({ setcurrentId }) {
  //const classes = useStyles;
  const assignmentsLists = useSelector(selectassignments);
  return (
    <div className={styles.activities}>
      {assignmentsLists.map((assignment) => (
        <SignleAssignment
          key={assignment._id}
          assignmentsLists={assignment}
          setcurrentId={setcurrentId}
        />
      ))}
    </div>
  );
}

export default AssignmentList;
