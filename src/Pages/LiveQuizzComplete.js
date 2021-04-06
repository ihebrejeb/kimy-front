import React from "react";
import "./Login.css";
import styles from "./userprofile.module.css";
import { makeStyles } from "@material-ui/core/styles";
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
    overflow: "scroll",
    height: 500,
  },
}));

function LiveQuizzComplete() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div style={modalStyle} className={classes.paper}>
      <form className={styles.form}>
        <h1>Your question</h1>
        <h2>Answers: 14</h2>

        <hr></hr>
        <p>ahmed</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>user2</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>Chucky</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>amin</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>iheb</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>yasmin</p>
        <p>Answer: a</p>
        <p>Chucky</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>amin</p>
        <p>Answer: b</p>
        <hr></hr>
        <p>iheb</p>
        <p>Answer: a</p>
        <hr></hr>
        <p>yasmin</p>
        <p>Answer: a</p>
      </form>
    </div>
  );
}

export default LiveQuizzComplete;
