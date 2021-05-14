import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./ListStyles";
import Quizz from "./Quizz";
import { useRef } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";

function Quizzs() {
  const classes = useStyles;
  const [quizzs, setquizzs] = useState(null);
  const socketRef = useRef();
  socketRef.current = io.connect("https://floating-cliffs-13024.herokuapp.com");
  socketRef.current.emit("get quizzs");

  useEffect(() => {
    socketRef.current.on("return quizzs", ({ quizzs }) => {
      console.log(setquizzs(quizzs));
      console.log(quizzs);
    });
    return () => socketRef.current.disconnect();
  });
  //const users = useSelector(state => state.users.userslist.users)
  if (quizzs) {
    return (
      <div>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {quizzs.map((quiz, index) => (
            <Grid key={quiz._id} item xs={12} sm={4} md={3}>
              <Quizz quizz={quiz} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else return <div></div>;
}

export default Quizzs;
