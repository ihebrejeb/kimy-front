import axios from 'axios' 
const url = 'http://localhost:4000/courses' ;

 export const fetchCourses =  () =>   axios.get(url);
 export const CreateCourses =  (newCourse) => axios.post(url , newCourse);
 export const UpdateCourses = (id , updatedCourse) => axios.patch(`${url}/${id}` , updatedCourse);
 export const deleteCourses = (id ) => axios.delete(`${url}/${id}` );


 
                  