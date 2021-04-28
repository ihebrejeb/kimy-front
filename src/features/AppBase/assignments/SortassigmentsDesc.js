import React from "react";
import styles from "../CourseActivity/SearchBar.module.css";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowDownwardTwoToneIcon from "@material-ui/icons/ArrowDownwardTwoTone";
function SortassigmentsDesc({ setsortdesc }) {
  return (
    <div>
      <div className={styles.withicon}>
        <div>
          <ArrowDownwardTwoToneIcon onClick={() => setsortdesc(true)} />{" "}
        </div>
      </div>
    </div>
  );
}

export default SortassigmentsDesc;
