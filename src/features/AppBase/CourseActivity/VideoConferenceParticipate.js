import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import styles from "./VideoConferenceParticipate.module.css";
import Icon from "@material-ui/core/Icon";

import { useHistory } from "react-router";
import Image from "./test.jpg";

function VideoConferenceParticipate() {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <img
        alt="Snow"
        src="https://web.static-rmg.be/if/c_crop,w_2000,h_1333,x_0,y_0,g_center/c_fit,w_620,h_413/9bd612e1192d67c8c47840cf718e8ae8.jpg"
      />
      <button className={styles.btn}>Join video conference</button>
    </div>
  );
}

export default VideoConferenceParticipate;
