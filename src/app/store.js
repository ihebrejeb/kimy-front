import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import coursesReducer from "../features/AppBase/courses/CoursesSlice";
import courseSliceReducer from "../features/AppBase/onlinseSession/CourseDemoSlice";
import coursesActivitiesReducer from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import assignmentsReducer from "../features/AppBase/assignments/AssignmentsSlice";
import forumReducer from "../features/AppBase/forum/ForumSlice";
import userReducer from "../features/AppBase/user/UserSlice";
export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["your/action/type"],
      // Ignore these field paths in all actions
      ignoredActionPaths: ["meta.arg", "payload.timestamp"],
      // Ignore these paths in the state
      ignoredPaths: ["items.dates"],
    },
  }),

  reducer: {
    courses: coursesReducer,
    coursedemo: courseSliceReducer,
    user: userReducer,
    forum: forumReducer,
    coursesActivities: coursesActivitiesReducer,
    assignmentss: assignmentsReducer,
  },
});
