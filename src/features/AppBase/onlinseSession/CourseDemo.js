import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Planning from "./Planning";
import { getRoomStatus } from "./url";

export default function CourseDemo() {
  const history = useHistory();
  const [status, setStatus] = useState("off");

  const [course] = useState({
    id: "604e13f2f436251ef0edf376",
    owner: "605469fc09b917eb1fef8b6f",
  });
  const [user, setUser] = useState({
    email: "iheb@rejeb.tn",
    id: "605469fc09b917eb1fef8b6f",
  });
  const changeUser = () => {
    if (user.id === "605469fc09b917eb1fef8b6f")
      setUser({
        email: "habib@esprit.tn",
        id: "60547beec72e941117a4d91e",
      });
    else
      setUser({
        email: "iheb@rejeb.tn",
        id: "605469fc09b917eb1fef8b6f",
      });
  };
  const joinLobby = () => {
    history.push("/video/" + course.id);
  };
  useEffect(() => {
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
  }, [course.id]);

  return (
    <>
      <h1>course:{course.id}</h1>
      <h2>status:{status}</h2>
      <button onClick={changeUser}>change user</button>
      {course.owner === user.id && <Planning courseId={course.id}></Planning>}
      {course.owner !== user.id && status !== "off" && (
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
