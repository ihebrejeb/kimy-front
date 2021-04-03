import React, { useEffect, useState } from "react";
import Recording from "./Recording";
import { getRoomsByCourseId } from "./url";
import styles from "./recordings.module.css";
import { useSelector } from "react-redux";
import { selectedcourse, user } from "./CourseDemoSlice";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button } from "@material-ui/core";
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
      <div className={styles.header}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            history.push("/app/videodemo");
          }}
          className={styles.backButton}
        >
          <ArrowBackIosIcon
            fontSize="inherit"
            className={styles.backIcon}
          ></ArrowBackIosIcon>
        </Button>

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
