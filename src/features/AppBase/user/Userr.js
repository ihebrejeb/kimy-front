import React from "react";
import styles from "./courseStyles.module.css";
import {
  Card,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Avatar,
} from "@material-ui/core/";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";
import { deleteUser } from "../actions/actioncrud.js";

function Userr({ users }) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          avatar={<Avatar aria-label="course"></Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={users.username}
          subheader={users.email}
        />

        <CardActions className={styles.cardActions}>
          <div>
            <Button
              size="small"
              color="primary"
              onclick={() => history.push("/signup")}
            >
              <AddCircleOutlineIcon fontSize="small" /> Join
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deleteUser(users._id))}
            >
              <ExitToAppIcon fontSize="small" /> Quit
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Userr;
