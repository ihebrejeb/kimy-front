import { Fab } from "@material-ui/core";
import {
  CancelPresentation,
  Mic,
  MicOff,
  ScreenShare,
  Videocam,
  VideocamOff,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Video from "twilio-video";
import styles from "./os.module.css";

export default function Participant({
  participant,
  me,
  isLocalVideo,
  isLocalAudio,
}) {
  const [isLocal, setisLocal] = useState(false);
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState();
  const [shareScreen, setshareScreen] = useState(null);
  const videosRef = useRef();
  const audiosRef = useRef();
  const localVideoRef = useRef();
  const [isVideo, setIsVideo] = useState(isLocalVideo);
  const [isAudio, setIsAudio] = useState(isLocalAudio);
  useEffect(() => {
    if (participant.identity === me) setisLocal(true);
  }, [me, participant.identity]);
  useEffect(() => {
    if (!localVideoTrack) {
      let track;
      const f = async () => {
        track = await Video.createLocalVideoTrack();
        setLocalVideoTrack(track);
        if (!isVideo) track.disable();
      };
      if (isLocal) {
        f();
      }
    }
  }, [isLocal, isVideo, localVideoTrack]);

  const trackSubscribed = (track) => {
    if (track.kind === "video") {
      setVideoTracks((Tracks) => [...Tracks, track]);
    }
    if (track.kind === "audio") {
      setAudioTracks((Tracks) => [...Tracks, track]);
    }
  };
  const trackUnsubscribed = (track) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
    }
    if (track.kind === "audio") {
      setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
    }
    track.detach();
  };
  useEffect(() => {
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        trackSubscribed(publication.track);
      }
    });
    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
  }, [participant]);
  useEffect(() => {
    let x = videosRef.current;
    videoTracks.forEach((track) => {
      x.appendChild(track.attach());
    });
    return () => {
      videoTracks.forEach((track) => {
        x.innerHTML = "";
        track.detach();
      });
    };
  }, [videoTracks]);
  useEffect(() => {
    if (localVideoTrack) {
      localVideoRef.current.appendChild(localVideoTrack.attach());
    }
  }, [localVideoTrack]);
  useEffect(() => {
    audioTracks.forEach((track) => {
      audiosRef.current.appendChild(track.attach());
    });
  }, [audioTracks]);

  function shareScreenHandler() {
    if (!shareScreen) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
          const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
          setshareScreen(screenTrack);
          participant.publishTrack(screenTrack);
          screenTrack.mediaStreamTrack.onended = () => {
            participant.unpublishTrack(screenTrack);
            screenTrack.stop();
            setshareScreen(null);
          };
        })
        .catch(() => {
          alert("Could not share the screen.");
        });
    } else {
      participant.unpublishTrack(shareScreen);
      shareScreen.stop();
      setshareScreen(null);
    }
  }
  const toggleVideo = () => {
    const videoTrack = Array.from(participant.videoTracks.values())[0].track;
    if (isVideo) {
      videoTrack.disable();
      localVideoTrack.disable();
      setIsVideo(false);
    } else {
      videoTrack.enable();
      localVideoTrack.enable();
      setIsVideo(true);
    }
  };
  const toggleAudio = () => {
    const Track = Array.from(participant.audioTracks.values())[0].track;
    if (isAudio) {
      Track.disable();
      setIsAudio(false);
    } else {
      Track.enable();
      setIsAudio(true);
    }
  };
  useEffect(() => {
    return () => localVideoTrack?.stop();
  }, [localVideoTrack]);
  return (
    <div className={styles.regular}>
      <div ref={videosRef} className={styles.bgb}></div>
      <div ref={audiosRef}></div>
      <div ref={localVideoRef}></div>
      <div className={styles.controles}>
        {isLocal && (
          <Fab
            size="small"
            className={!shareScreen ? styles.on : styles.off}
            onClick={shareScreenHandler}
          >
            {!shareScreen ? (
              <ScreenShare></ScreenShare>
            ) : (
              <CancelPresentation></CancelPresentation>
            )}
          </Fab>
        )}
        {isLocal && (
          <Fab
            size="small"
            onClick={toggleVideo}
            className={isVideo ? styles.on : styles.off}
          >
            {isVideo ? <Videocam></Videocam> : <VideocamOff></VideocamOff>}
          </Fab>
        )}
        {isLocal && (
          <Fab
            size="small"
            className={isAudio ? styles.on : styles.off}
            onClick={toggleAudio}
          >
            {isAudio ? <Mic></Mic> : <MicOff></MicOff>}
          </Fab>
        )}
      </div>
    </div>
  );
}
