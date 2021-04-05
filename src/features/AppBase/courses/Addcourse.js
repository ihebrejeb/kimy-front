import { TextField } from "@material-ui/core";
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

function Addcourse({ currentId, setcurrentId }) {
  const course = useSelector((state) =>
    currentId ? state.courses.values.find((c) => c._id === currentId) : null
  );

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
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (currentId) setOpen(true);
  }, [currentId]);
 
  const handleSubmit = (e) => {
    e.preventDefault();

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> </DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            noValidate
            className={styles.paper}
            onSubmit={handleSubmit}
          >
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={courseData.creator}
              onChange={(e) =>
                setcourseData({ ...courseData, creator: e.target.value })
              }
            />
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={courseData.title}
              onChange={(e) =>
                setcourseData({ ...courseData, title: e.target.value })
              }
            />
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={courseData.message}
              onChange={(e) =>
                setcourseData({ ...courseData, message: e.target.value })
              }
            />
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="tags"
              variant="outlined"
              label="Tags "
              value={courseData.tags}
              onChange={(e) =>
                setcourseData({
                  ...courseData,
                  tags: e.target.value.split(","),
                })
              }
            />
            <div className={styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setcourseData({ ...courseData, selectedFile: base64 })
                }
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Addcourse;
