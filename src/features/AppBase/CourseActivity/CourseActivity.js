import React from "react";
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

function CourseActivity({ coursesActivities, setcurrentId }) {
  const dispatch = useDispatch();

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
    noMargin: {
      margin: 0,
    },
    header: {
      backgroundColor: "#1569C7",
    },
  });

  const carddesign = useStylescard();
  return (
    <div>
      <Card className={carddesign.root}>
        <CardHeader
          className={carddesign.header}
          title={coursesActivities.title}
          subheader= {"Description of the Activity : " + coursesActivities.description}
          action={
            <div>
              <IconButton>
                <EditIcon onClick={() => setcurrentId(coursesActivities._id)} />
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

          {/* <Accordion className={carddesign.noMargin}>
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
          </Accordion> */}

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
              <Typography>assignments here </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

export default CourseActivity;
