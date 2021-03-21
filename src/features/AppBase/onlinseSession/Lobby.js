import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Video from "twilio-video";
import { createRoom, getTwilioToken } from "./url";

import VideoChat from "./VideoChat";
const Lobby = () => {
  const [username] = useState("iheb@rejeb.tn" + Math.random());
  const { roomName } = useParams();
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    return () => {
      if (room) room.disconnect();
    };
  }, [room]);
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
        video: { width: 320 },
        audio: true,
        RecordParticipantsOnConnect: true,
      });
      createRoom(room.sid, roomName);
      setConnecting(false);
      disableVideo(room);
      disableAudio(room);
      setRoom(room);
    } catch (err) {
      console.error(err);
      setConnecting(false);
    }
  };

  return room ? (
    <VideoChat room={room} setRoom={setRoom} me={username}></VideoChat>
  ) : (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Start Now"}
      </button>
    </form>
  );
};

export default Lobby;
