import React from "react";
import styles from "../CourseActivity/SearchBar.module.css";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowUpwardTwoToneIcon from "@material-ui/icons/ArrowUpwardTwoTone";

function SortAssignmentAsc({ setsort }) {
  return (
    <div>
      <div className={styles.withicon}>
        <div onClick={() => setsort(true)}>
          {" "}
          <ArrowUpwardTwoToneIcon />{" "}
        </div>
      </div>
    </div>
  );
}

export default SortAssignmentAsc;
