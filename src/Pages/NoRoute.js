import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoRoute.module.css";
export default function NoRoute() {
  return (
    <div className={styles.notfoundid}>
      <div className={styles.notfound}>
        <div class={styles.notfound404}>
          <div></div>
          <h1>404</h1>
        </div>
        <h2>Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
