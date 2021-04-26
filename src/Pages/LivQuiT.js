import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import "./Login.css";
import AnswerQuizz from "../features/AppBase/livequizz/AnswerQuizz.js";
import "./Login.css";
import styles from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import firebase from 'firebase' ;
import { Modal } from "@material-ui/core";
import { useRef } from "react";

function LivQuiT() {
  const [open, setOpen] = React.useState(false);
  const socketRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [livequi, setlivequi] = useState(null)

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("finished quizz", ({}) => {
      handleClose();
    });
    socketRef.current.on("new live quizz", ({ livequiz }) => {
      console.log(setlivequi(livequiz));
      handleOpen();
    });
    return () => socketRef.current.disconnect();
  });

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AnswerQuizz livequi={livequi}></AnswerQuizz>
      </Modal>
  );
}

export default LivQuiT;
