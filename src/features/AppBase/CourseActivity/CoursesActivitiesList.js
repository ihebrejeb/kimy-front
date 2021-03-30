import React from "react";
import { useSelector } from "react-redux";
import CourseActivity from "./CourseActivity";
import { Grid } from "@material-ui/core";

import { selectcoursesActivities } from "./CoursesActivitiesSlice";
//import useStyles from "./ListStyles";

function CoursesActivitiesList({ setcurrentId }) {
  //const classes = useStyles;
  const coursesActivities = useSelector(selectcoursesActivities);
  console.log(coursesActivities);
  return (
    <div>
      <Grid
        //   className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {coursesActivities.map((courseActivity) => (
          <Grid key={courseActivity._id} item xs={12} sm={4} md={3}>
            <CourseActivity
              coursesActivities={courseActivity}
              setCurrentId={setcurrentId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CoursesActivitiesList;
