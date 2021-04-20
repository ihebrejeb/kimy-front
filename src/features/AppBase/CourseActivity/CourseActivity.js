import React, { useState } from "react";
import { Card, Typography, CardHeader, IconButton } from "@material-ui/core/";
import { useDispatch } from "react-redux";
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

import SingleAssignment from "../assignments/SingleAssignment";
import DeleteAlert from "./DeleteAlert";
import Alert from "@material-ui/lab/Alert";

function CourseActivity({ setsort, coursesActivities, setcurrentId }) {
  const dispatch = useDispatch();
  const [deleteAlert, confirmDelete] = useState({
    isOpen: false,
    title: "",
  });

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
          subheader={
            "Description of the Activity : " + coursesActivities?.description
          }
          action={
            <div>
              <IconButton>
                <EditIcon onClick={() => setcurrentId(coursesActivities._id)} />
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
                        <Alert variant="filled" severity="error">
                          This is an info alert — check it out!
                        </Alert>;
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
                <Typography>{coursesActivities.file}</Typography>
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
                Assignments <DescriptionIcon></DescriptionIcon>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography> {coursesActivities.assignments} </Typography>
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
              <Typography>Insert Resources here</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

export default CourseActivity;
