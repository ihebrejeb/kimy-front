import React from "react";
import styles from "./courseStyles.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  IconButton,
  Avatar,
} from "@material-ui/core/";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { deleteCourseActivities } from "./CoursesActivitiesSlice";
import { useHistory } from "react-router";
import classes from "../CourseActivity/CourseActivity.module.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core/styles";

function CourseActivity({ coursesActivities, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "35%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  return (
    <div className={classes.root}>
      <Accordion className={styles.accor}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Files</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FolderIcon></FolderIcon>
          <Typography>Insert Files here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          title={coursesActivities.title}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Videos <VideoCallIcon></VideoCallIcon>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Insert videos here</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
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
  );
}

export default CourseActivity;
