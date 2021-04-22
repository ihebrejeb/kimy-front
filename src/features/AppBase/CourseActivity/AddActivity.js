import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../CourseActivity/addActivity.module.css";
import { FormControl, TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createCourseActivities, update } from "./CoursesActivitiesSlice";
import { useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import WarningIcon from "@material-ui/icons/Warning";

const schema = yup.object().shape({
  title: yup.string().required(" PLEASE ADD A TITLE   "),
  description: yup.string().required(" PLEASE ADD A DESCRIPTION"),
});
function AddActivity({ currentId, setcurrentId }) {
  /*****************************email */
  const emailSend = (templateId, variables) => {
    window.emailjs
      .send("service_p9zk5po", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };

  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  const activity = useSelector((state) =>
    currentId
      ? state.coursesActivities?.values.find((c) => c._id === currentId)
      : null
  );
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleError = () => {
    errors.title = "";
    errors.description = "";
  };
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
    handleError();
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
  const add = (e) => {
    //e.preventDefault();
    const templateId = "template_ujublkd";

    if (currentId) {
      dispatch(update(currentId, activityData));
    } else {
      dispatch(createCourseActivities(activityData));
      emailSend("template_ujublkd", {
        message_html:
          "A new activity has been added to the course you are subscribed to ! check it out ",
        from_name: "Gmail",
        reply_to: "khaoulakhmiri2022@gmail.com",
      });
      //emailjs.send(serviceID, templateID, templateParams, userID);
    }

    setOpen(false);
    clear();
  };

  return (
    <div>
      {/* <button onClick={handleClickOpen}>create an activity</button> */}
      <div className={styles.tooltip}>
        <Tooltip
          title="Add activity"
          aria-label="add activity"
          onClick={handleClickOpen}
        >
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <FormControl>
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
                {...register("title")}
                fullWidth
                multiline
                rows={4}
                value={activityData.title}
                onChange={(e) =>
                  setactivityData({ ...activityData, title: e.target.value })
                }
              />
              {/* <div className={styles.message_required}>
                <p className={styles.required}>
                  <WarningIcon></WarningIcon>This field is required{" "}
                </p>
              </div> */}
              <p className={styles.warninnng}>{errors.title?.message}</p>
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
                {...register("description")}
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
              />{" "}
              <p className={styles.warninnng}>{errors.description?.message} </p>
              <TextField
                InputLabelProps={{ className: styles.text }}
                InputProps={{ className: styles.field }}
                name="nbSeances"
                variant="outlined"
                label="Number of sessions"
                value={activityData.nbSeances}
                onChange={(e) =>
                  setactivityData({
                    ...activityData,
                    nbSeances: e.target.value,
                  })
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
            <button onClick={handleSubmit(add)} type="submit">
              Add activity to the course
            </button>
          </DialogActions>
        </Dialog>
      </FormControl>
    </div>
  );
}

export default AddActivity;
