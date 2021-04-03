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
import { deleteCourse } from "./CoursesSlice";
import { useHistory } from "react-router";

function Course({ courses, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          avatar={<Avatar aria-label="course"></Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon onClick={() => setCurrentId(courses._id)} />
            </IconButton>
          }
          title={courses.title}
          subheader={courses.creator}
        />

        <CardMedia
          className={styles.media}
          image={
            courses.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={courses.title}
        ></CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {courses.message}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <div>
            <Button
              size="small"
              color="primary"
              onclick={() => history.push("/app/forum")}
            >
              <AddCircleOutlineIcon fontSize="small" /> Join
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deleteCourse(courses._id))}
            >
              <ExitToAppIcon fontSize="small" /> Quit
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Course;
