import { FormControl, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import styles from "./addcourse.module.css";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createCourse, update } from "./CoursesSlice";
import { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  creator : yup.string().required("you have to add a creator") , 
  title : yup.string().required(" your course should have a name ") , 
  message : yup.string().required(" please provide more details about your course") , 

})
function Addcourse({ currentId, setcurrentId }) {
  const course = useSelector((state) =>
    currentId ? state.courses.values.find((c) => c._id === currentId) : null
  );
  
  const { register, handleSubmit,  formState: { errors } } = useForm(
    {
      resolver: yupResolver(schema),


    }
  )

  const [courseData, setcourseData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
 


  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  useEffect(() => {
    if (course) setcourseData(course);
  }, [course]);

  const clear = () => {
    setcurrentId(null);
    setcourseData({
      creator: " ",
      title: "",
      message: "",
    
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (currentId) setOpen(true);
  }, [currentId]);
 
  const submit = (e) => {
    if (currentId) {
      dispatch(update(currentId, courseData));
    } else {
      dispatch(createCourse(courseData));
    }

    setOpen(false);
    clear();
  };
 
  return (
    <div>
      <div className={styles.searchfield}>
        <button variant="outlined" color="secondary" onClick={handleClickOpen}>
          create your own  course 
        </button>
        <div className="header__search">
                    <SearchIcon></SearchIcon>
                    <input placeholder="Enter your Code here" type="text"/>
                </div>
      </div>
     <FormControl> 

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> </DialogTitle>
        <DialogContent>
                   
           
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              variant="outlined"
              label="Creator"
              fullWidth
              {...register('creator' ) }  
               
             value={courseData.creator}
              onChange={(e) =>
                setcourseData({ ...courseData, creator: e.target.value })
              }
            />
            <p className={styles.warning}>{errors.creator?.message} </p> 
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              variant="outlined"
              label="Title"
              fullWidth
              {...register('title'  ) }  
              value={courseData.title}
              onChange={(e) =>
                setcourseData({ ...courseData, title: e.target.value })
              }
            />
                      <p className={styles.warning}>{errors.title?.message} </p> 

            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              variant="outlined"
              {...register('message'  ) }  
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={courseData.message}
              onChange={(e) =>
                setcourseData({ ...courseData, message: e.target.value })
              }
            />
              <p className={styles.warning}>{errors.message?.message && errors.touched} </p> 

         
            <div className={styles.fileInput}>
              <FileBase

                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setcourseData({ ...courseData, selectedFile: base64 })
                }
              />
            

            </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <button type="submit" onClick={handleSubmit(submit)} > submit </button>
           
        </DialogActions>
      </Dialog>
      </FormControl>
    </div>
  );
}

export default Addcourse;
