import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import CoursesActivitiesList from "../features/AppBase/CourseActivity/CoursesActivitiesList";
import { GetCoursesActivities } from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import VideoConferenceParticipate from "../features/AppBase/CourseActivity/VideoConferenceParticipate";
import AddActivity from "../features/AppBase/CourseActivity/AddActivity";
function CourseActivitiesMainPage() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCoursesActivities());
  }, [currentId, dispatch]);

  return (
    <div>
      <div>
        <AddActivity currentId={currentId} />
      </div>

      <CoursesActivitiesList
        setcurrentId={setcurrentId}
      ></CoursesActivitiesList>
    </div>
  );
}

export default CourseActivitiesMainPage;
