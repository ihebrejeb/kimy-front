import React from 'react'
import Addcourse from '../features/AppBase/courses/Addcourse'
import CoursesList from '../features/AppBase/courses/CoursesList'
import { Container,  Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetCourses } from '../features/AppBase/courses/CoursesSlice';


function Courses() {
  
  const dispatch = useDispatch()

  useEffect(() => { 
      dispatch(GetCourses()) ;

  }, [dispatch] ) 
  

  return (

    
      <Container maxWidth="lg">
      
      <Grow in>
        <Container>
          <Grid container display="flex "  justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
                <Addcourse/> 
           </Grid>
            <Grid item xs={12} sm={7}>
            <CoursesList/> 
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
       
     
    
  )
}

export default Courses

