import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Video from "twilio-video";
import VideoChat from "./VideoChat";
const Lobby = () => {
  //605263127183066d455fc0b7
  const [username] = useState("605262ef7183066d455fc0b6" + Math.random());
  const { roomName } = useParams();
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    return () => {
      if (room) room.disconnect();
    };
  }, [room]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setConnecting(true);
    const res = await fetch("http://localhost:4000/twilio/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.warn(data);
    try {
      const room = await Video.connect(data.token, {
        name: roomName,
      });
      setConnecting(false);
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
        {connecting ? "Connecting" : "Join"}
      </button>
    </form>
  );
};

export default Lobby;
