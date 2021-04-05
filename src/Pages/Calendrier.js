import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./userprofile.module.css";

export default function Calendrier() {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.page}>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
