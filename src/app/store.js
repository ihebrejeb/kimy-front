import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import coursesReducer from '../features/AppBase/courses/CoursesSlice';
import userReducer from '../features/AppBase/user/UserSlice'
import rootReducer from '../features/AppBase/user/rootReducer'
export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates']
    }
  }),

  reducer: {
    courses: coursesReducer,
    user: userReducer,
    users: rootReducer
  },
});
