import React, { useEffect, useState } from "react";
import { composeVideo, getMediaLinks, recordingRoom } from "./url";
import styles from "./os.module.css";
import moment from "moment";

export default function Recording({ room, isOwner }) {
  const [mediaLink, setMediaLink] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState(room.recordingStatus);
  useEffect(() => {
    const getVideo = async () => {
      const res = await getMediaLinks(room.roomSID);
      setMediaLink(
        res?.data?.body?.redirect_to ? res.data.body.redirect_to : null
      );
    };
    getVideo();
  }, [room.roomSID]);
  const makeVideo = () => {
    composeVideo(room.roomSID);
    setRecordingStatus(true);
    recordingRoom(room.roomSID);
  };
  return (
    <div className={styles.recording}>
      <h3>{moment(room.createdAt).format("MMMM Do YYYY, hh:mm a")}</h3>
      {mediaLink && <video src={mediaLink} controls></video>}
      {!mediaLink && isOwner && (
        <button onClick={makeVideo} hidden={recordingStatus}>
          Compose video for room:{room.roomSID}
        </button>
      )}
    </div>
  );
}
