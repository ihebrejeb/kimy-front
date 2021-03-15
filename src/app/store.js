import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/AppBase/courses/CoursesSlice';

export default configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
