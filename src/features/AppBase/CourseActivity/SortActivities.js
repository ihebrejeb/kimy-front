import React from "react";
import styles from "./SearchBar.module.css";
import SortIcon from "@material-ui/icons/Sort";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import GradeIcon from "@material-ui/icons/Grade";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";

function SortActivities({ setsort }) {
  return (
    <div>
      <div className={styles.withicon}>
        <SortIcon />
        <div onClick={() => setsort(true)}> Sort </div>
      </div>
    </div>
  );
}

export default SortActivities;
