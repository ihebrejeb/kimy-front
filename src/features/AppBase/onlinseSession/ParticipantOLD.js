import { Fab } from "@material-ui/core";
import {
  CancelPresentation,
  Mic,
  MicOff,
  ScreenShare,
  Videocam,
  VideocamOff,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import styles from "./os.module.css";
import Video from "twilio-video";

const Participant = ({ participant, me }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenTrack, setscreenTrack] = useState(null);
  const videoRef = useRef();
  const audioRef = useRef();
  const screenRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setIsVideo(track.isEnabled);
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setIsAudio(track.isEnabled);
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant, videoTracks]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      setIsVideo(videoTrack.isEnabled);
      videoTrack.on("disabled", () => {
        setIsVideo(false);
      });
      videoTrack.on("enabled", () => {
        setIsVideo(true);
      });
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);
  useEffect(() => {
    const videoTrack = videoTracks[1];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      setIsScreenSharing(videoTrack.isEnabled);
      videoTrack.on("disabled", () => {
        setIsScreenSharing(false);
      });
      videoTrack.on("enabled", () => {
        setIsScreenSharing(true);
      });
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      setIsAudio(audioTrack.isEnabled);
      audioTrack.on("disabled", () => {
        setIsAudio(false);
      });
      audioTrack.on("enabled", () => {
        setIsAudio(true);
      });
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const toggleVideo = () => {
    const videoTrack = videoTracks[0];
    isVideo ? videoTrack.disable() : videoTrack.enable();
  };

  const toggleAudio = () => {
    const audioTrack = audioTracks[0];
    isAudio ? audioTrack.disable() : audioTrack.enable();
  };
  const shareScreen = () => {
    if (!screenTrack) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
          const x = new Video.LocalVideoTrack(stream.getTracks()[0]);
          setscreenTrack(x);
          participant.publishTrack(x);
          setIsScreenSharing(true);
          setIsVideo(true);
        })
        .catch(() => {
          alert("Could not share the screen.");
        });
    } else {
      participant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setscreenTrack(null);
      setIsScreenSharing(false);
      setIsVideo(false);
    }
  };

  return (
    <div className={styles.participant}>
      <video ref={videoRef} autoPlay={true} hidden={!isVideo} />
      <video ref={screenRef} autoPlay={true} hidden={!isScreenSharing} />

      <div className={styles.placeholder} hidden={isVideo}>
        {participant.sid}
      </div>
      <audio
        ref={audioRef}
        autoPlay={true}
        muted={participant.identity === me}
      />
      <div className={styles.controles}>
        {!isAudio && participant.identity !== me && <MicOff></MicOff>}
        {participant.identity === me && (
          <Fab
            size="small"
            onClick={toggleVideo}
            className={isVideo ? styles.on : styles.off}
          >
            {isVideo ? <Videocam></Videocam> : <VideocamOff></VideocamOff>}
          </Fab>
        )}
        {participant.identity === me && (
          <Fab
            size="small"
            className={isAudio ? styles.on : styles.off}
            onClick={toggleAudio}
          >
            {isAudio ? <Mic></Mic> : <MicOff></MicOff>}
          </Fab>
        )}
        {participant.identity === me && (
          <Fab
            size="small"
            className={!isScreenSharing ? styles.on : styles.off}
            onClick={shareScreen}
          >
            {!isScreenSharing ? (
              <ScreenShare></ScreenShare>
            ) : (
              <CancelPresentation></CancelPresentation>
            )}
          </Fab>
        )}
      </div>
    </div>
  );
};

export default Participant;
