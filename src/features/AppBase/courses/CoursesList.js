import React from "react";
import { useSelector } from "react-redux";
import Course from "./Course";
import { Grid } from "@material-ui/core";

import { selectcourses } from "./CoursesSlice";
import useStyles from "./ListStyles";

function CoursesList({ setcurrentId }) {
  const classes = useStyles;
  const courses = useSelector(selectcourses);
  return courses.length ? (
    <div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {courses.map((course) => (
          <Grid key={course?._id} item xs={12} sm={6} md={2}>
            <Course courses={course} setCurrentId={setcurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <div class="loader_container_small">
      <img src="/Logo.png" width="150px" alt="logo"></img>
      <div class="loader__wrapper">
        <div class="loader__left"></div>
        <div class="loader__right"></div>
        <div class="loader__left"></div>
      </div>
    </div>
  );
}

export default CoursesList;
