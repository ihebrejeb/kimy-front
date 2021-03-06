import React from "react";
import Addcourse from "../features/AppBase/courses/Addcourse";
import CoursesList from "../features/AppBase/courses/CoursesList";
import styles from "./Courses.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetCourses, searchCourse } from "../features/AppBase/courses/CoursesSlice";
import { useState } from "react";

import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";

function Courses() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  var [code, setcode] = useState("")

  useEffect(() => {
    if (code !== '') {
      dispatch(searchCourse(code))
    }
   else { 
    dispatch(GetCourses());
    dispatch(selectCourse(null));
  }
  }, [code,dispatch]);

  return (
    <div className={styles.fluid}>
      <Addcourse currentId={currentId} setcurrentId={setcurrentId} code={code}  setcode={setcode} />

      <div className={styles.courses}>
        {" "}
        <CoursesList setcurrentId={setcurrentId} />{" "}
      </div>
      
    </div>
    
  );
}

export default Courses;
