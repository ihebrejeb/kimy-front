/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./x.module.css";
import io from "socket.io-client";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { TextField } from "@material-ui/core";

function LiveChat() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };
  return (
    <div className={styles.renderchat}>
      {renderChat()}

      <div className={styles.namefield}>
        <TextField
          name="name"
          onChange={(e) => onTextChange(e)}
          value={state.name}
          label="Name"
        />
      </div>
      <form onSubmit={onMessageSubmit}>
        <TextField
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"
        />

        <button>Send Message</button>
      </form>
    </div>
  );
}

export default LiveChat;
