import React from "react";
import TextField from "@material-ui/core/TextField";
//import "./Login.css";
import LiveQuizzComplete from "./LiveQuizzComplete.js";
import styles from "./userprofile.module.css";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 500,
  },
}));

function LiveQuizz() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  /*   const handleClose = () => {
    setOpen(false);
  }; */

  return open ? (
    <LiveQuizzComplete></LiveQuizzComplete>
  ) : (
    <div style={modalStyle} className={classes.paper}>
      <form className={styles.form}>
        <p className={styles.p}>Start your live quizz</p>
        <TextField label="Question" type="text"></TextField>
        <TextField label="Option 1" type="text"></TextField>
        <TextField label="Option 2" type="text"></TextField>
        <TextField label="Option 3" type="text"></TextField>
        <TextField label="Option 4" type="text"></TextField>
        <TextField label="Option 5" type="text"></TextField>
        <Button variant="contained" color="default" onClick={handleOpen}>
          Ask
        </Button>
      </form>
    </div>
  );
}

export default LiveQuizz;
