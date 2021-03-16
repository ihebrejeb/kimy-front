import axios from 'axios' 
const url = 'http://localhost:4000/courses' ;

 export const fetchCourses =  () =>   axios.get(url);
 export const CreateCourses =  (newCourse) =>   axios.get(url , newCourse);

                                      