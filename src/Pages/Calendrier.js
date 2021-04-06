import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { selectCourse } from "../features/AppBase/onlinseSession/CourseDemoSlice";
import styles from "./userprofile.module.css";

export default function Calendrier() {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectCourse(null));
  }, [dispatch]);
  return (
    <div className={styles.page}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
