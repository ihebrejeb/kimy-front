import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "./livequizz.module.css";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart } from "react-minimal-pie-chart";

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

function LiveQuizzComplete({ livequizz }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  console.log(livequizz);

  const socketRef = useRef();
  /*  const [livequi, setlivequi] = useState({
    _id: "",
    question: "",
    optionOne: "",
    optionTwo: "",
    answer: []
  }); */

  const [livequi, setlivequi] = useState("");
  const [nbanswers, setnbanswers] = useState("");
  const [startlist, setstartlist] = useState(false);
  const [nbcorr, setnbcorr] = useState(0);
  const [nbwrong, setnbwrong] = useState(0);
  var ncorr = 0;
  let nwrong;

  useEffect(() => {
    socketRef.current = io.connect(
      "https://floating-cliffs-13024.herokuapp.com"
    );
    socketRef.current.on("new answer quizz", ({ doc, corect }) => {
      console.log(setlivequi(doc));
      console.log(doc);
      console.log(livequi);
      console.log(setstartlist(true));
      if (corect) {
        setnbcorr(nbcorr + 1);
        console.log(nbcorr);
      } else {
        setnbwrong(nbwrong + 1);
        console.log(nbwrong);
      }
    });
    return () => socketRef.current.disconnect();
  });

  const coloranswer = (correct, answervalue) => {
    if (correct) {
      return <p className={styles.greencol}>{answervalue}</p>;
    } else return <p className={styles.redcol}>{answervalue}</p>;
  };

  const updatenb = () => {
    setnbcorr(0);
    setnbwrong(0);
    for (const property of livequi.answer) {
      console.log("prop");
      console.log(property);
    }
  };

  const listAnswers = () => {
    if (startlist) {
      return livequi.answer.map(({ username, answervalue, correct }, index) => (
        <div className={styles.form} key={index}>
          <hr className={styles.hr}></hr>
          <p className={styles.por}>Username: </p>
          <p>{username}</p>
          <p className={styles.por}>Answer: </p>
          {coloranswer(correct, answervalue)}
        </div>
      ));
    } else return <div></div>;
  };

  const nbAnswers = () => {
    if (startlist) {
      return (
        <div>
          <div className={styles.porle}>
            <h2>Answers: {livequi.answer.length}</h2>
          </div>
          <div className={styles.piepie}>
            <div>
              <p className={styles.greencol}>Correct answers {nbcorr}</p>
              <p className={styles.redcol}>Wrong answers {nbwrong}</p>
            </div>
            <PieChart
              data={[
                {
                  title: "Correct answers",
                  value: nbcorr,
                  color: "rgb(33, 209, 107)",
                },
                {
                  title: "Wrong answers",
                  value: nbwrong,
                  color: "rgb(255, 65, 90)",
                },
              ]}
              viewBoxSize={[100, 100]}
              animationEasing="ease-out"
              style={{ height: "100px" }}
            />
            ;
          </div>
        </div>
      );
    } else return <h2>Answers: 0</h2>;
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <form className={styles.form}>
        <h1 className={styles.p}>Question: {livequizz.question}</h1>

        {nbAnswers()}
        {listAnswers()}
      </form>
    </div>
  );
}

export default LiveQuizzComplete;
