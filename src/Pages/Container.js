import React from "react";
import styles from "./Container.module.css";
import { useHistory } from "react-router-dom";
import Whiteboard from "./Whiteboard";

function Container() {
  const history = useHistory();

  return (
    <div>
      <div className={styles.container}>
        <img className={styles.nav_img} src="/logo.png" alt="logo" />
        <div className={styles.colorPickerContainer}>
          <input type="color"></input>
        </div>
        <div className={styles.boardContainer}>
          <Whiteboard></Whiteboard>
        </div>
      </div>
    </div>
  );
}

export default Container;
