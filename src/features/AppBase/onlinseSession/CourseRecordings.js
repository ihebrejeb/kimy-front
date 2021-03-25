import React, { useEffect, useState } from "react";
import Recording from "./Recording";
import { getRoomsByCourseId } from "./url";
import styles from "./os.module.css";
import { useSelector } from "react-redux";
import { selectedcourse, user } from "./CourseDemoSlice";
import { useHistory } from "react-router";
export default function CourseRecordings() {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const course = useSelector(selectedcourse);
  const u = useSelector(user);
  useEffect(() => {
    if (!course.id) history.push("/app/videodemo");
    setIsOwner(course.owner === u.id);
    const getRooms = async () => {
      const { data } = await getRoomsByCourseId(course.id);
      setRooms(data);
    };
    getRooms();
  }, [course, history, u.id]);
  return (
    <>
      <button
        onClick={() => {
          history.push("/app/videodemo");
        }}
      >
        go back
      </button>
      <h1>{course.title}</h1>
      <div className={styles.recordings}>
        {rooms.map((room) => (
          <Recording key={room._id} room={room} isOwner={isOwner}></Recording>
        ))}
      </div>
    </>
  );
}
