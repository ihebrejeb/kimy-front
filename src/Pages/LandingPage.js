import React from "react";
import styles from "./Landing.module.css";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();
  return (
    <div>
      <div className={styles.nav}>
        <img className={styles.nav_img} src="/logo.png" alt="logo" />
        <div className={styles.navigation}>
          <p className={styles.screens}>Features</p>
          <p className={styles.screens}>pricing</p>
          <p className={styles.screens}>contact</p>
        </div>
        <button
          className={styles.signupButton}
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </button>
        or
        <button
          className={styles.signinButton}
          onClick={() => history.push("/login")}
        >
          Sign in
        </button>
      </div>

      <div className={styles.content}>
        <div>
          <div className={styles.title}>
            <h1> K.I.M.Y </h1>
            <h1> Smart Virtual Classroom</h1>
          </div>

          <p className={styles.paragraphe}>
            {" "}
            K.I.M.Y is a digital E-Learning plateform created to help learners
            from different backgrounds improve their communication among each
            other in a safe and easy environment{" "}
          </p>

          <div className={styles.buttons}>
            <button className={styles.button}>Start free trial</button>
            <button className={styles.button_learn}>Learn more</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
