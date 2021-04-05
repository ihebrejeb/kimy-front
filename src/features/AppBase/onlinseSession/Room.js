import React, { useEffect, useRef, useState } from "react";
import "./test.css";
import Participant from "./Participant";
const Room = ({ room, me, isVideo, isAudio }) => {
  const [participants, setParticipants] = useState([]);

  const scene = useRef();

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

  return (
    <div className="flex">
      <div className="room">
        <div ref={scene} id="Scenary">
          <Test scene={scene} participants={participants}></Test>
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
const Test = ({ scene, participants }) => {
  const [x, setx] = useState(participants.length);
  const itemEls = useRef([]);
  const [selected, setselected] = useState(null);
  useEffect(() => {
    if (!selected)
      scene.current.style.height = 100 / (Math.floor((x - 1) / 3) + 1) + "%";
    else scene.current.style.height = "100%";
  }, [scene, x, selected]);
  useEffect(() => {
    setx(participants.length);
  }, [participants]);
  return (
    <>
      {participants.map((participant) => (
        <div
          key={participant.sid}
          className={
            selected === participant.sid ? "Camera selected" : "Camera"
          }
          ref={(el) => (itemEls.current = [...itemEls.current, el])}
          onClick={() => {
            selected ? setselected(null) : setselected(participant.sid);
          }}
        >
          <Participant key={participant.sid} participant={participant} />
        </div>
      ))}
    </>
  );
};

export default Room;
