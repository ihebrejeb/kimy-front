import React, { useEffect, useState } from "react";
import styles from "./CourseActivitiesMainPage.module.css";
import { useDispatch } from "react-redux";
import CoursesActivitiesList from "../features/AppBase/CourseActivity/CoursesActivitiesList";
import {
  GetCoursesActivities,
  getSorted,
  searchThread,
  getSorted,
} from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import AddActivity from "../features/AppBase/CourseActivity/AddActivity";
import AddAssignment from "../features/AppBase/assignments/AddAssignment";
import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";
import Container from "./Container";
import SearchPage from "../features/AppBase/CourseActivity/SearchPage";
import SortActivities from "../features/AppBase/CourseActivity/SortActivities";
import AssignmentsList from "../features/AppBase/assignments/AssignmentsList";
import SingleAssignment from "../features/AppBase/assignments/SingleAssignment";
import { GetAssignments } from "../features/AppBase/assignments/AssignmentsSlice";
function CourseActivitiesMainPage() {
  const [currentId, setcurrentId] = useState(null);
  const [currentIdassign, setcurrentIdassign] = useState(null);
  var [title, setTitle] = useState("");
  var [sort, setsort] = useState(false);


  const dispatch = useDispatch();

  const [course] = useState({
    id: "604e13f2f436251ef0edf376",
    // title: "React Pi dev",
    owner: "605469fc09b917eb1fef8b6f",
  });
  useEffect(() => {
    dispatch(selectCourse(course));
  }, [course, dispatch]);

  useEffect(() => {
    if (title !== "") {
      dispatch(searchThread(title));
    } else {
      dispatch(GetCoursesActivities());
    }
  }, [title, dispatch]);

  // useEffect(() => {
  //   dispatch(GetAssignments());
  // }, [  dispatch]);

  useEffect(() => {
    if (sort === true) {
      dispatch(getSorted());
    } else {
      dispatch(GetCoursesActivities());
    }
  }, [sort, dispatch]);

  return (
    <div className={styles.content}>
      <div className={styles.addActivity}>
        <SortActivities setsort={setsort}></SortActivities>

        <SearchPage setTitle={setTitle} title={title} />
        <AddAssignment currentIdassign={currentIdassign} />
        <AssignmentsList></AssignmentsList>

        <AddActivity currentId={currentId} setcurrentId={setcurrentId} />
      </div>
      <div className={styles.activityList}>
        <CoursesActivitiesList
          setcurrentId={setcurrentId}
        ></CoursesActivitiesList>
      </div>
    </div>
  );
}

export default CourseActivitiesMainPage;
