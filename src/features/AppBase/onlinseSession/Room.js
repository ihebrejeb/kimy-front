import React, { useEffect, useRef, useState } from "react";
import "./test.css";
import Participant from "./Participant";
const Room = ({ room, me, isVideo, isAudio }) => {
  const [participants, setParticipants] = useState([]);
  const [dominantSpeaker, setdominantSpeaker] = useState(null);
  const scene = useRef();
  useEffect(() => {
    room.on("dominantSpeakerChanged", (participant) => {
      setdominantSpeaker(participant);
      console.log("The new dominant speaker in the Room is:", participant);
    });
  }, [room]);
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="flex">
      <div className="room">
        <div ref={scene} id="Scenary">
          <Test scene={scene} remoteParticipants={remoteParticipants}></Test>
        </div>
      </div>
      <div className="controls">
        <Participant
          me={me}
          key={room.localParticipant.sid}
          participant={room.localParticipant}
          isLocalVideo={isVideo}
          isLocalAudio={isAudio}
        />
      </div>
      <div className="chat">CHAT</div>
    </div>
  );
};
const Test = ({ scene, remoteParticipants }) => {
  const [x, setx] = useState(remoteParticipants.length);
  const itemEls = useRef([]);
  useEffect(() => {
    scene.current.style.height = 100 / (Math.floor((x - 1) / 3) + 1) + "%";
  }, [scene, x]);
  useEffect(() => {
    setx(remoteParticipants.length);
  }, [remoteParticipants]);
  return (
    <>
      {remoteParticipants.map((participant) => (
        <div
          className="Camera"
          ref={(el) => (itemEls.current = [...itemEls.current, el])}
        >
          {participant}
        </div>
      ))}
    </>
  );
};

export default Room;
