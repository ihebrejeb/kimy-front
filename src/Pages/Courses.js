import React from "react";
import Addcourse from "../features/AppBase/courses/Addcourse";
import CoursesList from "../features/AppBase/courses/CoursesList";
import styles from "./Courses.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetCourses } from "../features/AppBase/courses/CoursesSlice";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";

function Courses() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  }));

  useEffect(() => {
    dispatch(GetCourses());
    dispatch(selectCourse(null));
  }, [dispatch]);

  return (
    <div>
      <div>
        {" "}
        <Addcourse currentId={currentId} />{" "}
      </div>

      <div className={styles.courses}>
        {" "}
        <CoursesList setcurrentId={setcurrentId} />{" "}
      </div>
    </div>
  );
}

export default Courses;
