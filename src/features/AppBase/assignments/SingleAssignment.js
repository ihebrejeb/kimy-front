import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../assignments/addAssignment.module.css";
import { IconButton, TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortassigmentsDesc from "./SortassigmentsDesc";
import VisibilityIcon from "@material-ui/icons/Visibility";
import clsx from "clsx";
import styless from "./assignmentList.module.css";
import {
  createnewAssignment,
  GetAssignments,
  updateAssign,
} from "./AssignmentsSlice";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router";
import CourseActivity from "../CourseActivity/CourseActivity";
import AssignmentList from "./AssignmentsList";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import PDF from "../../../assignment.pdf";

import TimerIcon from "@material-ui/icons/Timer";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DescriptionIcon from "@material-ui/icons/Description";

import DownloadLFile from "./DownloadLFile";
import ShowAssignment from "./ShowAssignment";
function SingleAssignment({ currentIdassign, assignmentact, setcurrentId }) {
  //****************************** */
  // const downloadTxtFile = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([document.getElementById("input").value], {
  //     type: "text/plain;charset=utf-8",
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "myFile.txt";
  //   document.body.appendChild(element);
  //   element.click();
  // };

  /************************ */
  const [assignmentData, setassignmentData] = useState({
    file: "",
  });
  const useStylesAnchor = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  });
  const [openPDF, setOpenPDF] = React.useState(false);

  const classesAnchor = useStylesAnchor();
  const [state, setState] = React.useState({
    top: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const showPDF = () => {
    // <embed
    //   target="_blank"
    //   src={PDF}
    //   type="application/pdf"
    //   height={200}
    //   width={200}
    // />
    <ShowAssignment />;
  };
  const list = (anchor) => (
    <div
      className={clsx(classesAnchor.list, {
        [classesAnchor.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <p> Details about the assignment</p>
      <List>
        {" "}
        <BorderColorIcon
          className={styless.button_assignment}
        ></BorderColorIcon>
        {assignmentact.title}
      </List>
      <Divider />
      <List>
        {" "}
        <DescriptionIcon className={styless.button_assignment} />
        {assignmentact.description}
      </List>
      <Divider />
      <List>
        {" "}
        <TimerIcon className={styless.button_assignment}></TimerIcon>
        <span className={styless.text_assignment}>
          Please submit your work sheet before :
        </span>{" "}
        <span className={styless.text_assignment}>
          {" "}
          {assignmentact.dateLimite}
        </span>
      </List>
      {/* <img src={assignmentact.ass} alt={name}> */}
      <div className={styles.fileInput}>
        <FileBase
          type="file"
          value={assignmentData.file}
          multiple={false}
          onDone={({ base64 }) =>
            setassignmentData({ ...assignmentData, file: base64 })
          }
        />
      </div>
      <button className={styles.addButton}>Submit my work </button>
    </div>
  );

  /*******************************drawer */
  const assignment = useSelector((state) =>
    currentIdassign
      ? state.assignments?.values.find((c) => c._id === currentIdassign)
      : null
  );
  useEffect(() => {
    if (currentIdassign) setOpen(true);
  }, [currentIdassign]);
  const [open, setOpen] = React.useState(false);

  const handlePDF = () => {
    setOpenPDF(true);
  };
  const handleClose = () => {
    // clear();
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "105%",
      maxWidth: 900,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="500px" align="left">
                {assignmentact.title}
              </TableCell>
              <TableCell width="200px" align="right">
                <p lassName={styless.text_assignment}>
                  {assignmentact.dateLimite}
                </p>
              </TableCell>
              <TableCell width="200px" align="right">
                <ShowAssignment></ShowAssignment>
              </TableCell>
              <TableCell width="100px" align="right">
                <IconButton>
                  <div>
                    {["left"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <VisibilityIcon
                          className={styless.button_assignment}
                          onClick={toggleDrawer(anchor, true)}
                        >
                          {anchor}
                        </VisibilityIcon>

                        <Drawer
                          open={open}
                          onClose={handleClose}
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {/* /******************************drawer */}
    </div>
  );
}
export default SingleAssignment;
