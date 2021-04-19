import React from "react";
import styles from "./SearchBar.module.css";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import ReplayIcon from "@material-ui/icons/Replay";

function SortActivities({ setsort }) {
  return (
    <div>
      <div className={styles.withicon}>
        <div onClick={() => setsort(true)}>
          {" "}
          <SortByAlphaIcon />{" "}
        </div>
        <div className={styles.button} onClick={() => setsort(false)}>
          {" "}
          <ReplayIcon></ReplayIcon>
        </div>
      </div>
    </div>
  );
}

export default SortActivities;
