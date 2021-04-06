import React from "react";
import { useSelector } from "react-redux";
import Course from "./Course";
import { Grid } from "@material-ui/core";

import { selectcourses } from "./CoursesSlice";
import useStyles from "./ListStyles";

function CoursesList({ setcurrentId }) {
  const classes = useStyles;
  const courses = useSelector(selectcourses);
  return (
    <div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {courses.map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={2}>
            <Course courses={course} setCurrentId={setcurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CoursesList;
