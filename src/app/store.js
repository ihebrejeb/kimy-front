import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import coursesReducer from "../features/AppBase/courses/CoursesSlice";
import auth from "../features/AppBase/user/reducers/auth.js";
import rootReducer from "../features/AppBase/user/rootReducer";
import courseSliceReducer from "../features/AppBase/onlinseSession/CourseDemoSlice";
import coursesActivitiesReducer from "../features/AppBase/CourseActivity/CoursesActivitiesSlice";
import forumReducer from "../features/AppBase/forum/ForumSlice";
import assignmentsReducer from "../features/AppBase/assignments/AssignmentsSlice";

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
    user: auth,
    users: rootReducer,
    forum: forumReducer,
    coursesActivities: coursesActivitiesReducer,
    assignments: assignmentsReducer,
  },
});
