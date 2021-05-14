import React, { useEffect, useState } from "react";
import {
  composeVideo,
  deleteRoomApi,
  getMediaLinks,
  recordingRoom,
} from "./url";
import styles from "./recordings.module.css";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router";

export default function Recording({ room, isOwner, setRooms }) {
  const [mediaLink, setMediaLink] = useState(null);

  const [recordingStatus, setRecordingStatus] = useState(room.recordingStatus);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const getVideo = async () => {
      const res = await getMediaLinks(room.roomSID);

      setMediaLink(
        res?.data?.body?.redirect_to ? res.data.body.redirect_to : null
      );
      setloading(false);
    };
    getVideo();
  }, [room.roomSID]);
  const makeVideo = () => {
    composeVideo(room.roomSID);
    setRecordingStatus(true);
    recordingRoom(room.roomSID);
  };
  const deleteRoom = () => {
    deleteRoomApi(room.roomSID);
    setRooms((rooms) => rooms.filter((r) => r.roomSID !== room.roomSID));
  };
  return loading ? (
    <Skeleton variant="rect" width={350} height={300} />
  ) : (
    <>
      <Card className={styles.video}>
        <CardHeader
          title="Online Session"
          subheader={moment(room.createdAt).format("MMMM Do YYYY, hh:mm a")}
        />
        <CardActionArea>
          <CardMedia>
            {" "}
            {mediaLink && (
              <video src={mediaLink} controls className={styles.video}></video>
            )}
          </CardMedia>
        </CardActionArea>
        <CardActions>
          {!mediaLink && isOwner && !recordingStatus && (
            <Button color="primary" onClick={makeVideo}>
              Compose video
            </Button>
          )}
          {!mediaLink && isOwner && recordingStatus && (
            <Button color="primary" className={styles.button}>
              Composing
              <CircularProgress
                className={styles.buttonProgress}
                size={16}
              ></CircularProgress>
            </Button>
          )}
          {isOwner && (
            <>
              <Button color="primary" onClick={deleteRoom}>
                Delete recording
              </Button>
              <Button
                color="primary"
                onClick={() => history.push("/app/attendance/" + room._id)}
              >
                Attendance
              </Button>
              <Button
                color="primary"
                onClick={() => history.push("/app/quizzs/" + room._id)}
              >
                Quizzs
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
}
