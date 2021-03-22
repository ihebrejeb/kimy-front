import React from 'react'
import Addcourse from '../features/AppBase/courses/Addcourse'
import CoursesList from '../features/AppBase/courses/CoursesList'
import styles from './Courses.module.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetCourses } from '../features/AppBase/courses/CoursesSlice';
import { useState } from 'react';
;

function Courses() {
  const [currentId, setcurrentId] = useState(null) ;
  const dispatch = useDispatch()
  

  useEffect(() => { 
      dispatch(GetCourses()) ;

  }, [currentId, dispatch  ] ) 
  

  return (

    <div>
      <div >  <Addcourse currentId={currentId} /> </div>

      <div className={styles.courses}>  <CoursesList setcurrentId={setcurrentId} />  </div>
          
          
         
    </div>
     
    
  )
}

export default Courses

