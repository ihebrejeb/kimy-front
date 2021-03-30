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

function CourseActivity({ coursesActivities, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          avatar={<Avatar aria-label="course"></Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon
                onClick={() => setCurrentId(coursesActivities._id)}
              />
            </IconButton>
          }
          title={coursesActivities.title}
        />

        <CardMedia
          className={styles.media}
          image={
            coursesActivities.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={coursesActivities.title}
        ></CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {coursesActivities.title}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}></CardActions>
      </Card>
    </div>
  );
}

export default CourseActivity;
