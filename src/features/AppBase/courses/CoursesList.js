import React from 'react'
import { useSelector } from 'react-redux';
import Course from './Course'
import { selectcourses } from './CoursesSlice';
import useStyles from "./ListStyles"

function CoursesList() {
    const classes= useStyles ;
    const courses = useSelector(selectcourses)
    console.log(courses)
    return (
        <div>
            <Course/>
            <Course/>
            <Course/>
            <Course/>
        </div>
    )
}

export default CoursesList
