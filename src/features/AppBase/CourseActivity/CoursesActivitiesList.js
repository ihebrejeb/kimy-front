import React from "react";
import { useSelector } from "react-redux";
import CourseActivity from "./CourseActivity";
import { Grid } from "@material-ui/core";

import { selectactivities } from "./CoursesActivitiesSlice";
import styles from "../CourseActivity/CourseActivityList.module.css";
//import useStyles from "./ListStyles";

function CoursesActivitiesList({ setcurrentId }) {
  //const classes = useStyles;
  const coursesActivities = useSelector(selectactivities);
  return (
<<<<<<< HEAD
    <div>
      {coursesActivities.map((courseActivity) => (
        <Grid key={courseActivity._id} item xs={12} sm={4} md={3}>
=======
    <div className={styles.activities}>
      {coursesActivities.map((courseActivity) => (
        <div key={courseActivity._id} item xs={12} sm={4} md={3}>
>>>>>>> 3fee4db47d23ec5c6784fd607a2a2e7ab434a4ac
          <CourseActivity
            coursesActivities={courseActivity}
            setCurrentId={setcurrentId}
          />
        </div>
      ))}
    </div>
  );
}

export default CoursesActivitiesList;
