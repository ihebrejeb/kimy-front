import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Video from "twilio-video";
import LocalVideo from "./LocalVideo";
import Room from "./Room";
import styles from "./lobby.module.css";
import { createRoom, getTwilioToken } from "./url";
import { Button, CircularProgress } from "@material-ui/core";
const Lobby = () => {
  const [username] = useState("iheb@rejeb.tn" + Math.random());
  const { roomName } = useParams();
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const disableVideo = (a) => {
    const trackpubsToTracks = (trackMap) =>
      Array.from(trackMap.values())
        .map((publication) => publication.track)
        .filter((track) => track !== null);
    const videoTrack = trackpubsToTracks(a.localParticipant.videoTracks)[0];
    videoTrack.disable();
  };

  const disableAudio = (a) => {
    const trackpubsToTracks = (trackMap) =>
      Array.from(trackMap.values())
        .map((publication) => publication.track)
        .filter((track) => track !== null);
    const audioTrack = trackpubsToTracks(a.localParticipant.audioTracks)[0];

    audioTrack.disable();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setConnecting(true);
    const { data } = await getTwilioToken(username, roomName);
    try {
      const room = await Video.connect(data.token, {
        name: roomName,
        video: { height: 200, name: "camera" },
        audio: { name: "microphone" },
        dominantSpeaker: true,
        RecordParticipantsOnConnect: true,
      });
      createRoom(room.sid, roomName);
      setConnecting(false);
      if (!isVideo) disableVideo(room);
      if (!isAudio) disableAudio(room);
      setRoom(room);
    } catch (err) {
      console.error(err);
      setConnecting(false);
    }
  };
  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, [setRoom]);
  useEffect(() => {
    const tidyUp = (event) => {
      if (event.persisted) {
        return;
      }
      if (room) {
        handleLogout();
      }
    };
    if (room) {
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [handleLogout, room]);
  useEffect(() => {
    return () => {
      if (room) {
        room.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        room.disconnect();

        setRoom(null);
      }
    };
  }, [room]);

  return room ? (
    <Room room={room} me={username} isVideo={isVideo} isAudio={isAudio} />
  ) : (
    <div className={styles.lobby}>
      <LocalVideo
        setIsVideo={setIsVideo}
        isAudio={isAudio}
        isVideo={isVideo}
        setIsAudio={setIsAudio}
        connecting={connecting}
      ></LocalVideo>
      <Button
        variant="outlined"
        color="primary"
        disabled={connecting}
        onClick={handleSubmit}
      >
        {connecting ? (
          <CircularProgress
            className={styles.buttonProgress}
            size={16}
          ></CircularProgress>
        ) : (
          "Join now"
        )}
      </Button>
    </div>
  );
};

export default Lobby;
