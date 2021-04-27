import React from "react";
import PDF from "../../../assignment.pdf";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import styless from "./assignmentList.module.css";

function ShowAssignment() {
  return (
    //   <embed src={PDF} type="application/pdf" height={800} width={500} />
    <div>
      <a href={PDF} target="_blank">
        <PictureAsPdfIcon className={styless.button_assignment} />{" "}
      </a>
    </div>
  );
}

export default ShowAssignment;
