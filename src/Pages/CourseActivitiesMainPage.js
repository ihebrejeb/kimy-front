import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import CoursesActivitiesList from "../features/AppBase/CourseActivity/CoursesActivitiesList";
import { GetCoursesActivities } from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import  VideoConferenceParticipate  from "../features/AppBase/CourseActivity/VideoConferenceParticipate";
function CourseActivitiesMainPage() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCoursesActivities());
  }, [dispatch]);

  return (
    <div>
      <VideoConferenceParticipate></VideoConferenceParticipate>
      <CoursesActivitiesList
        setcurrentId={setcurrentId}
      ></CoursesActivitiesList>
    </div>
  );
}

export default CourseActivitiesMainPage;