import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectCourse, user } from "./CourseDemoSlice";
import { getRoomStatus } from "./url";

export default function CourseDemo() {
  const history = useHistory();
  const [status, setStatus] = useState("off");
  const dispatch = useDispatch();
  const u = useSelector(user);
  const [course] = useState({
    id: "604e13f2f436251ef0edf376",
    title: "React Pi dev",
    owner: "605469fc09b917eb1fef8b6f",
  });

  const joinLobby = () => {
    history.push("/app/video/" + course.id);
  };
  useEffect(() => {
    dispatch(selectCourse(course));
    const getStatus = async () => {
      const { data } = await getRoomStatus(course.id);
      setStatus(data);
    };

    getStatus();
    let interval = setInterval(() => {
      getStatus();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [course, dispatch]);

  return (
    <>
      <h1>course:{course.title}</h1>
      <h2>online session:{status}</h2>

      {course.owner === u.id && (
        <button onClick={() => history.push(`/app/video/${course.id}`)}>
          Create an online session
        </button>
      )}
      {course.owner !== u.id && status !== "off" && (
        <button onClick={joinLobby}>Join</button>
      )}
      <button
        onClick={() => history.push("/app/course/" + course.id + "/recordings")}
      >
        Course Recordings
      </button>
    </>
  );
}
