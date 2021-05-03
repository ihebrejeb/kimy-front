import React, { useEffect, useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import {
  Card,
  Typography,
  CardHeader,
  IconButton,
  Snackbar,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseActivities } from "./CoursesActivitiesSlice";
import classes from "../CourseActivity/CourseActivity.module.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import EditIcon from "@material-ui/icons/Edit";
import VideocamIcon from "@material-ui/icons/Videocam";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import SingleAssignment from "../assignments/SingleAssignment";
import DeleteAlert from "./DeleteAlert";
import Alert from "@material-ui/lab/Alert";
import ShowAssignment from "../assignments/ShowAssignment";
import PDF from "../../../assignment.pdf";
import PDF1 from "../../../activity.pdf";

import GetAppIcon from "@material-ui/icons/GetApp";
import AddAssignment from "../assignments/AddAssignment";
import { GetAssignments } from "../assignments/AssignmentsSlice";

function CourseActivity({
  setsort,
  coursesActivities,
  setcurrentId,
  Assignment,
}) {
  // store.addNotification({
  //   title: "Wonderful!",
  //   message: "teodosii@react-notifications-component",
  //   type: "success",
  //   insert: "top",
  //   container: "top-right",
  //   animationIn: ["animate__animated", "animate__fadeIn"],
  //   animationOut: ["animate__animated", "animate__fadeOut"],
  //   dismiss: {
  //     duration: 5000,
  //     onScreen: true,
  //   },
  // });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.data.user);

  const [deleteAlert, confirmDelete] = useState({
    isOpen: false,
    title: "",
  });

  useEffect(() => {
    dispatch(GetAssignments());
  }, [dispatch]);

  const useStylescard = makeStyles({
    root: {
      width: "100%",
      backgroundColor: "transparent",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    heading: {
      width: "200px",
    },
    noMargin: {
      margin: 0,
    },
    header: {
      backgroundColor: "#448ee4 ",
    },
  });

  const carddesign = useStylescard();
  return (
    <div>
      <Card className={carddesign.root}>
        <CardHeader
          className={carddesign.header}
          title={coursesActivities.title}
          subheader={"Creator of the activity :" + user.username}
          action={
            <div>
              <IconButton>
                <EditIcon onClick={() => setcurrentId(coursesActivities._id)} />
              </IconButton>
              <IconButton>
                {" "}
                <AddAssignment
                  onClick={() => setcurrentId(coursesActivities._id)}
                  activityid={coursesActivities._id}
                ></AddAssignment>
              </IconButton>
              <IconButton>
                <DeleteIcon
                  onClick={() => {
                    confirmDelete({
                      isOpen: true,
                      title:
                        "Are you certain you want to delete this activity?",
                      onConfirm: () => {
                        dispatch(deleteCourseActivities(coursesActivities._id));
                      },
                    });
                  }}
                />
              </IconButton>
            </div>
          }
        />
        <DeleteAlert deleteAlert={deleteAlert} confirmDelete={confirmDelete} />
        <div>
          <Accordion className={carddesign.noMargin}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Files / video recordings
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Files
                    <FolderIcon></FolderIcon>
                  </Typography>
                </AccordionSummary>
                <Typography>
                  <a href={PDF1} target="_blank">
                    <button>
                      {" "}
                      <GetAppIcon height="200px"></GetAppIcon>
                      {coursesActivities.title + ".pdf"}
                    </button>
                  </a>
                </Typography>
              </Accordion>
            </AccordionDetails>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Videos <VideocamIcon></VideocamIcon>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </AccordionDetails>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            ></AccordionSummary>
          </Accordion>
          <Accordion className={carddesign.noMargin}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Description of the activity <DescriptionIcon></DescriptionIcon>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography> {coursesActivities.description} </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={carddesign.noMargin}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Assignments <AssignmentIcon></AssignmentIcon>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <a href={PDF} target="_blank">
                  <button>
                    {" "}
                    <GetAppIcon height="200px"></GetAppIcon>
                    {coursesActivities.title + "_assignment.pdf"}
                  </button>
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={carddesign.noMargin}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Resources <LanguageIcon></LanguageIcon>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{coursesActivities.ressources}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

export default CourseActivity;
