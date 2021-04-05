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
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import EditIcon from "@material-ui/icons/Edit";
import VideocamIcon from "@material-ui/icons/Videocam";

function CourseActivity({ coursesActivities, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const useStylescard = makeStyles({
    root: {
      width: 270,
      backgroundColor: "#1569C7",
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
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "20%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  const carddesign = useStylescard();
  return (
    <div>
      <Card className={carddesign.root}>
        <CardHeader
          title={coursesActivities.title}
          action={
            <div>
              <IconButton>
                <EditIcon onClick={() => setCurrentId(coursesActivities._id)} />
              </IconButton>

              <IconButton>
                <DeleteIcon
                  onClick={() =>
                    dispatch(deleteCourseActivities(coursesActivities._id))
                  }
                />
              </IconButton>
            </div>
          }
        />
        <div className={classes.root}>
          <Accordion>
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
                    Files <FolderIcon></FolderIcon>
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
                <Typography>videos </Typography>
              </Accordion>
            </AccordionDetails>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            ></AccordionSummary>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Description of the chapter <DescriptionIcon></DescriptionIcon>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{coursesActivities.description}</Typography>
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
      </Card>
    </div>
  );
}

export default CourseActivity;
