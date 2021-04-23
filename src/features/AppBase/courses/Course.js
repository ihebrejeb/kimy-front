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
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { deleteCourse } from "./CoursesSlice";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDialog from '../Confirmation/ConfirmDialog'
import { useState } from "react";


function Course({ courses, setCurrentId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  return (
     
    <Card className={styles.card}>
      <CardHeader
        avatar={<Avatar aria-label="course"></Avatar>}
        action={
          <IconButton aria-label="settings">
            <EditIcon onClick={() => setCurrentId(courses._id)} />
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
            onClick={() => history.push("/app/activites")}
          >
            <AddCircleOutlineIcon fontSize="small" /> Open
          </Button>

          <Button
            size="small"
            color="primary"
            
            onClick={() => {
              setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to delete this course?',
                  subTitle: "You can't undo this operation",
                   onConfirm: () => { dispatch(deleteCourse(courses._id)) }
              })
          }}
          >
            <ExitToAppIcon fontSize="small" /> Leave
          </Button>
        </div>
      </CardActions>
      <ConfirmDialog
     confirmDialog={confirmDialog}
     setConfirmDialog={setConfirmDialog}
 />
    </Card>
    
 
  );
}

export default Course;
