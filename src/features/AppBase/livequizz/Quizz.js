import React from "react";
import {
  Card,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Avatar,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core/";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";
import { deleteUser } from "../actions/actioncrud.js";
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";
import Answersquizz from "./Answersquizz"


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Quizz({ quizz }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log(quizz)
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Question:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {quizz.question}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleOpen} size="small" color="primary">
          See answers
        </Button>
      </CardActions>
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Answersquizz livequi={quizz}></Answersquizz>
      </Modal>
    </div>
  );
}

export default Quizz;
