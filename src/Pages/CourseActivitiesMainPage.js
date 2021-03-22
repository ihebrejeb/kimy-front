import React from "react";

import { useHistory } from "react-router";
import Activities from "../features/CourseActivity/Activities";

function CourseActivitiesMainPage() {
  const history = useHistory();

  return (
    <div>
      <Activities></Activities>
    </div>
  );
}

export default CourseActivitiesMainPage;
