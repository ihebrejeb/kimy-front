import React, { useEffect, useState } from "react";
import styles from "./CourseActivitiesMainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import CoursesActivitiesList from "../features/AppBase/CourseActivity/CoursesActivitiesList";
import {
  GetCoursesActivities,
  getSorted,
  searchThread,
} from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import AddActivity from "../features/AppBase/CourseActivity/AddActivity";
import SearchPage from "../features/AppBase/CourseActivity/SearchPage";
import SortActivities from "../features/AppBase/CourseActivity/SortActivities";
import AssignmentsList from "../features/AppBase/assignments/AssignmentsList";
import { useHistory, useParams } from "react-router";
import { selectedcourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";

function CourseActivitiesMainPage() {
  const [currentId, setcurrentId] = useState(null);
  const course = useSelector(selectedcourse);
  const history = useHistory();
  var [title, setTitle] = useState("");
  var [sort, setsort] = useState(false);

  const dispatch = useDispatch();
  let { courseid } = useParams();
  useEffect(() => {
    if (title !== "") {
      dispatch(searchThread(title));
    } else {
      dispatch(GetCoursesActivities(courseid));
    }
  }, [title, dispatch, courseid]);
  useEffect(() => {
    if (!course._id) {
      history.push("/app");
    }
  }, [course._id, history]);
  // useEffect(() => {
  //   dispatch(GetAssignments());
  // }, [  dispatch]);

  useEffect(() => {
    if (sort === true) {
      dispatch(getSorted());
    } else {
      dispatch(GetCoursesActivities(courseid));
    }
  }, [sort, dispatch, courseid]);

  return (
    <div className={styles.content}>
      <div className={styles.addActivity}>
        <AssignmentsList></AssignmentsList>

        <SortActivities setsort={setsort}></SortActivities>

        <SearchPage setTitle={setTitle} title={title} />
        {/* <AddAssignment currentIdassign={currentIdassign} /> */}

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
