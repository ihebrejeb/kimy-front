import React from "react";
import styles from "../CourseActivity/SearchBar.module.css";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowUpwardTwoToneIcon from "@material-ui/icons/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@material-ui/icons/ArrowDownwardTwoTone";

function SortAssignmentAsc({ setsort }) {
  return (
    <div>
      <div className={styles.withicon}>
        <div>
          <ArrowUpwardTwoToneIcon onClick={() => setsort(true)} />{" "}
        </div>{" "}
        <ArrowDownwardTwoToneIcon
          onClick={() => setsort(false)}
        ></ArrowDownwardTwoToneIcon>
      </div>
    </div>
  );
}

export default SortAssignmentAsc;
