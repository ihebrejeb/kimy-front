import React, { useEffect, useState } from "react";
import styles from "./os.module.css";
import Participant from "./Participant";
const Room = ({ room, me, isVideo, isAudio }) => {
  const [participants, setParticipants] = useState([]);
  const [dominantSpeaker, setdominantSpeaker] = useState(null);
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
  const test = [...Array(2).keys()].map((x) => (
    <div className={styles.regular}></div>
  ));
  let func = () => {
    switch (participants.length) {
      case 1:
        return styles.grid1;
      case 2:
        return styles.grid2;
      default:
        return styles.grid3;
    }
  };

  return (
    <div className={styles.room}>
      <div className={styles.localParticipant}>
        <Participant
          me={me}
          key={room.localParticipant.sid}
          participant={room.localParticipant}
          isLocalVideo={isVideo}
          isLocalAudio={isAudio}
        />
      </div>

      <div className={func()}>{remoteParticipants}</div>
    </div>
  );
};

export default Room;
