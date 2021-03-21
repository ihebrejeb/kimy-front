import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Recordings from "./Recordings";
import { getRoomsByCourseId } from "./url";
import styles from "./os.module.css";
export default function CourseRecordings() {
  const [rooms, setRooms] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    const getRooms = async () => {
      const { data } = await getRoomsByCourseId(courseId);
      setRooms(data);
    };
    getRooms();
  }, [courseId]);
  return (
    <>
      <h1>Course name here</h1>
      <div className={styles.recordings}>
        {rooms.map((room) => (
          <Recordings key={room._id} room={room}></Recordings>
        ))}
      </div>
    </>
  );
}
