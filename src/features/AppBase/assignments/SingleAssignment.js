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

import TimerIcon from "@material-ui/icons/Timer";
function SingleAssignment({ currentIdassign, assignmentact, setcurrentId }) {
  const useStylesAnchor = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  });

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
  const list = (anchor) => (
    <div
      className={clsx(classesAnchor.list, {
        [classesAnchor.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <p > Details about the assignment</p>
      <List>{assignmentact.title}</List>
      <Divider />
      <List> {assignmentact.description}</List>
      <Divider />
      <TimerIcon className={styless.button_assignment}></TimerIcon>
      <List>
        {" "}
        <span className={styless.text_assignment}>
          please submit your work before :
        </span>{" "}
        {assignmentact.dateLimite}
      </List>
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // clear();
    setOpen(false);
  };
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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
              <TableCell maxWidth="100px" align="left">
                {assignmentact.title}
              </TableCell>
              <TableCell maxWidth="100px" align="left">
                <p lassName={styless.text_assignment}>
                  {assignmentact.dateLimite}
                </p>
              </TableCell>
              <TableCell maxWidth="100px" align="right">
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
