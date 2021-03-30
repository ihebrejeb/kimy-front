import { Button } from "@material-ui/core";
import React, { useEffect } from "react";

import { useHistory } from "react-router";
//import Activities from "../features/CourseActivity/Activities";
//import VideoConferenceParticipate from "../features/CourseActivity/VideoConferenceParticipate";
import { useDispatch } from "react-redux";
//import { GetCourseActivity } from "../features/CourseActivity/CourseActivitySlice";
//import ActivitiesList from "../features/CourseActivity/ActivitiesList";

function CourseActivitiesMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(GetCourseActivity());
  }, [dispatch]);

  return (
    <div>
      <VideoConferenceParticipate></VideoConferenceParticipate>
      <ActivitiesList></ActivitiesList>
    </div>
  );
}

export default CourseActivitiesMainPage;
