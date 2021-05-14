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

export function LiveQuizz() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //const [state, setState] = useState({ question: "", optionOne: "", optionTwo });
  const [chat, setChat] = useState([]);
  const [question, setquestion] = useState("");
  const [livequi, setlivequi] = useState("");
  const [optionOne, setoptionOne] = useState("");
  const [optionTwo, setoptionTwo] = useState("");
  const [optionThree, setoptionThree] = useState("");
  const [optionFour, setoptionFour] = useState("");
  const [optionFive, setoptionFive] = useState("");
  const [optionCorrect, setoptionCorrect] = useState("");
  const socketRef = useRef();
  const [open, setOpen] = React.useState(false);
  const charRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect(
      "http://floating-cliffs-13024.herokuapp.com"
    );
    socketRef.current.on("new live quizz", ({ livequiz }) => {
      setlivequi(livequiz);
      console.log(livequiz);
      console.log(livequi);
    });

    //charRef.current.scrollTop = charRef.current.scrollHeight;
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onQuizzSubmit = (e) => {
    //const { name, message } = state;
    socketRef.current.emit("new live quizz", {
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      optionFive,
      optionCorrect,
    });
    e.preventDefault();
    setOpen(true);
    //setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3 className={styles.title}>
          {name}: <span className={styles.message}>{message}</span>
        </h3>
      </div>
    ));
  };
  return open ? (
    <LiveQuizzComplete livequizz={livequi}></LiveQuizzComplete>
  ) : (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={onQuizzSubmit} className={styles.form}>
        <p className={styles.p}>Start your live quizz</p>
        <TextField
          label="Question"
          type="text"
          onChange={(e) => setquestion(e.target.value)}
        ></TextField>
        <RadioGroup aria-label="gender" name="gender1">
          <TextField
            label="Option 1"
            type="text"
            onChange={(e) => setoptionOne(e.target.value)}
          ></TextField>
          <FormControlLabel
            value={optionOne}
            control={<Radio />}
            label="correct answer"
            onChange={(e) => setoptionCorrect(e.target.value)}
          />
          <TextField
            label="Option 2"
            type="text"
            onChange={(e) => setoptionTwo(e.target.value)}
          ></TextField>
          <FormControlLabel
            value={optionTwo}
            control={<Radio />}
            label="correct answer"
            onChange={(e) => setoptionCorrect(e.target.value)}
          />
          <TextField
            label="Option 3"
            type="text"
            onChange={(e) => setoptionThree(e.target.value)}
          ></TextField>
          <FormControlLabel
            value={optionThree}
            control={<Radio />}
            label="correct answer"
            onChange={(e) => setoptionCorrect(e.target.value)}
          />
          <TextField
            label="Option 4"
            type="text"
            onChange={(e) => setoptionFour(e.target.value)}
          ></TextField>
          <FormControlLabel
            value={optionFour}
            control={<Radio />}
            label="correct answer"
            onChange={(e) => setoptionCorrect(e.target.value)}
          />
          <TextField
            label="Option 5"
            type="text"
            onChange={(e) => setoptionFive(e.target.value)}
          ></TextField>
          <FormControlLabel
            value={optionFive}
            control={<Radio />}
            label="correct answer"
            onChange={(e) => setoptionCorrect(e.target.value)}
          />
        </RadioGroup>
        <Button variant="contained" color="default" onClick={onQuizzSubmit}>
          Ask
        </Button>
      </form>
    </div>
  );
}

export default LiveQuizz;
