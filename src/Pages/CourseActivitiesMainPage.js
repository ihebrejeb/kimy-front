import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import CoursesActivitiesList from "../features/AppBase/CourseActivity/CoursesActivitiesList";
import { GetCoursesActivities } from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";

function CourseActivitiesMainPage() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCoursesActivities());
  }, [currentId, dispatch]);

  return (
    <div>
      <CoursesActivitiesList></CoursesActivitiesList>
    </div>
  );
}

export default CourseActivitiesMainPage;
