import React, { useCallback, useEffect } from "react";
import Room from "./Room";

const VideoChat = ({ room, setRoom, me }) => {
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

  return <Room room={room} me={me} />;
};

export default VideoChat;
