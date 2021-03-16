import React from 'react'
import Addcourse from '../features/AppBase/courses/Addcourse'
import CoursesList from '../features/AppBase/courses/CoursesList'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetCourses } from '../features/AppBase/courses/CoursesSlice';


function Courses() {
  
  const dispatch = useDispatch()
  


  useEffect(() => { 
      dispatch(GetCourses()) ;

  }, [dispatch] ) 
  

  return (

    <div>
      <div>  <Addcourse/> </div>

      <div>  <CoursesList/>  </div>
          
          
         
    </div>
     
    
  )
}

export default Courses

