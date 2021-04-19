import React from "react";
import styles from "./SearchBar.module.css";
import SortIcon from "@material-ui/icons/Sort";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import GradeIcon from "@material-ui/icons/Grade";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";

function SortActivities({ setsort, setTitle, title }) {
  return (
    <div className={styles.side}>
      <div className={styles.withicon}>
        <RefreshIcon />
        <div className={styles.button} onClick={() => setsort(false)}>
          {" "}
          Home
        </div>
      </div>
      <div className={styles.withicon}>
        <SortIcon />
        <div className={styles.button} onClick={() => setsort(true)}>
          {" "}
          Most Liked Threads{" "}
        </div>
      </div>
    </div>
  );
}

export default SortActivities;
