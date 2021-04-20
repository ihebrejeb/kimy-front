import React from "react";
import { useSelector } from "react-redux";
import CourseActivity from "./CourseActivity";

import { selectactivities } from "./CoursesActivitiesSlice";
import styles from "../CourseActivity/CourseActivityList.module.css";
//import useStyles from "./ListStyles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SingleAssignment from "../assignments/SingleAssignment";
function CoursesActivitiesList({ setcurrentId }) {
  //const classes = useStyles;
  const coursesActivities = useSelector(selectactivities);
  return (
    <div className={styles.activities}>
      <SingleAssignment></SingleAssignment>
      {coursesActivities.map((courseActivity) => (
        <CourseActivity
          key={courseActivity._id}
          coursesActivities={courseActivity}
          setcurrentId={setcurrentId}
        />
      ))}
    </div>
  );
}

export default CoursesActivitiesList;
