/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./livequizz.module.css";
import LiveQuizzComplete from "./LiveQuizzComplete.js";
import io from "socket.io-client";
import {
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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

export function AnswerQuizz({ livequi }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const user = useSelector((state) => state.user.user.data.user);
  const username = user.username;
  console.log(livequi);
  /* const [livequi, setlivequi] = useState({
      question: "question",
      optionOne: "optionone",
      optionTwo: "optiontwo"
  }); */
  const [answer, setanswer] = useState("");
  let corect = false;
  const socketRef = useRef();
  const [open, setOpen] = React.useState(true);
  const [correct, setcorrect] = React.useState(false);
  const [optionCorrect, setoptionCorrect] = React.useState(false);
  useEffect(() => {
    socketRef.current = io.connect(
      "https://floating-cliffs-13024.herokuapp.com"
    );
    /* socketRef.current.on("new live quizz", ({ livequiz }) => {
      setlivequi(livequiz);
      setOpen(true);
    }); */
    return () => socketRef.current.disconnect();
  }, [livequi]);

  const onAnswerSubmit = (e) => {
    console.log(answer);
    console.log("data");
    console.log(livequi.optionCorrect);
    if (answer === livequi.optionCorrect) {
      corect = true;
    } else corect = false;
    console.log(corect);
    socketRef.current.emit("new answer quizz", {
      username,
      answer,
      livequi,
      corect,
    });
    e.preventDefault();
    setOpen(true);
  };

  return !open ? (
    <div></div>
  ) : (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={onAnswerSubmit} className={styles.form}>
        <h1 className={styles.p}>Question: {livequi.question}</h1>
        <FormLabel component="legend">Answer</FormLabel>
        <RadioGroup aria-label="gender" name="gender1">
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel
              value={livequi.optionOne}
              control={<Radio />}
              label={livequi.optionOne}
              onChange={(e) => setanswer(e.target.value)}
            />
            <FormControlLabel
              value={livequi.optionTwo}
              control={<Radio />}
              label={livequi.optionTwo}
              onChange={(e) => setanswer(e.target.value)}
            />
            <FormControlLabel
              value={livequi.optionThree}
              control={<Radio />}
              label={livequi.optionThree}
              onChange={(e) => setanswer(e.target.value)}
            />
            <FormControlLabel
              value={livequi.optionFour}
              control={<Radio />}
              label={livequi.optionFour}
              onChange={(e) => setanswer(e.target.value)}
            />
            <FormControlLabel
              value={livequi.optionFive}
              control={<Radio />}
              label={livequi.optionFive}
              onChange={(e) => setanswer(e.target.value)}
            />
          </RadioGroup>
        </RadioGroup>
        <Button variant="contained" color="default" onClick={onAnswerSubmit}>
          Reply
        </Button>
      </form>
    </div>
  );
}

export default AnswerQuizz;
