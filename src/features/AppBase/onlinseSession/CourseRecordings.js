import React, { useEffect, useState } from "react";
import Recording from "./Recording";
import { getRoomsByCourseId } from "./url";
import styles from "./recordings.module.css";
import { useSelector } from "react-redux";
import { selectedcourse } from "./CourseDemoSlice";
import {} from "../user/UserSlice";
import { useHistory } from "react-router";

export default function CourseRecordings() {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const course = useSelector(selectedcourse);
  const u = useSelector((state) => state.user.user.data.user);
  useEffect(() => {
    if (!course._id) history.push("/app");
    setIsOwner(course.creator._id === u._id);
    const getRooms = async () => {
      const { data } = await getRoomsByCourseId(course._id);
      setRooms(data);
    };
    getRooms();
  }, [course, history, u._id]);
  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>{course.title}</h3>
      </div>

      <div className={styles.recordings}>
        {rooms.map((room) => (
          <Recording
            key={room._id}
            room={room}
            isOwner={isOwner}
            setRooms={setRooms}
          ></Recording>
        ))}
      </div>
    </>
  );
}
