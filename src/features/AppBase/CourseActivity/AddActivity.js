import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../CourseActivity/addActivity.module.css";
import { TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createCourseActivities, update } from "./CoursesActivitiesSlice";
import { useHistory } from "react-router";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";

function AddActivity({ currentId, setcurrentId }) {
  // function sendEmail(e) {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_p9zk5po",
  //       "template_ujublkd",
  //       e.target,
  //       "user_r5RFyW2FxoC8HlShJkEV4"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // }

  const activity = useSelector((state) =>
    currentId
      ? state.coursesActivities?.values.find((c) => c._id === currentId)
      : null
  );
  const history = useHistory();

  const [activityData, setactivityData] = useState({
    title: "",
    file: "",
    video: "",
    description: "",
    nbSeances: "",
    ressources: "",
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (currentId) setOpen(true);
  }, [currentId]);
  const handleClose = () => {
    clear();
    setOpen(false);
  };
  useEffect(() => {
    if (activity) setactivityData(activity);
  }, [activity]);

  const clear = () => {
    setcurrentId(null);
    setactivityData({
      title: " ",
      file: "",
      video: "",
      description: "",
      nbSeances: "",
      ressources: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(update(currentId, activityData));
    } else {
      dispatch(createCourseActivities(activityData));
      /// emailjs.send("service_p9zk5po", "template_ujublkd");

      //sendEmail(e);
    }

    setOpen(false);
    clear();
  };
  return (
    <div>
      <button onClick={handleClickOpen}>create an activity</button>
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
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              multiline
              rows={4}
              value={activityData.title}
              onChange={(e) =>
                setactivityData({ ...activityData, title: e.target.value })
              }
            />
            <div className={styles.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setactivityData({ ...activityData, file: base64 })
                }
              />
            </div>
            <div className={styles.fileInput}>
              Select a video from the recordings
              <Button onClick={() => history.push("/app/course/recordings")}>
                {" "}
                recordings{" "}
              </Button>
            </div>
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={activityData.description}
              onChange={(e) =>
                setactivityData({
                  ...activityData,
                  description: e.target.value,
                })
              }
            />
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="nbSeances"
              variant="outlined"
              label="Number of sessions"
              value={activityData.nbSeances}
              onChange={(e) =>
                setactivityData({ ...activityData, nbSeances: e.target.value })
              }
            />
            <TextField
              InputLabelProps={{ className: styles.text }}
              InputProps={{ className: styles.field }}
              name="ressources"
              variant="outlined"
              label="Ressources "
              fullWidth
              multiline
              rows={4}
              value={activityData.ressources}
              onChange={(e) =>
                setactivityData({
                  ...activityData,
                  ressources: e.target.value,
                })
              }
            />
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

export default AddActivity;
