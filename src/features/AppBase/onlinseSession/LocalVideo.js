import { Fab } from "@material-ui/core";
import { Mic, MicOff, Videocam, VideocamOff } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import Video from "twilio-video";
import styles from "./lobby.module.css";
export default function LocalVideo({
  isVideo,
  setIsVideo,
  isAudio,
  setIsAudio,
  connecting,
}) {
  const videoRef = useRef();
  const [track, settrack] = useState(null);
  useEffect(() => {
    let track;
    const func = async () => {
      track = await Video.createLocalVideoTrack();
      settrack(track);
      videoRef.current.appendChild(track.attach());
    };
    func();
    return () => {
      track.stop();
    };
  }, []);
  const toggleVideo = () => {
    isVideo ? track?.disable() : track?.enable();
    setIsVideo(!isVideo);
  };
  return (
    <div ref={videoRef} className={styles.localVideo}>
      {!connecting && (
        <div className={styles.localVideoControls}>
          <Fab
            size="small"
            onClick={toggleVideo}
            className={isVideo ? styles.on : styles.off}
          >
            {isVideo ? <Videocam></Videocam> : <VideocamOff></VideocamOff>}
          </Fab>
          <Fab
            size="small"
            className={isAudio ? styles.on : styles.off}
            onClick={() => setIsAudio(!isAudio)}
          >
            {isAudio ? <Mic></Mic> : <MicOff></MicOff>}
          </Fab>
        </div>
      )}
    </div>
  );
}
