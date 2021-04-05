import { Button } from "@material-ui/core";
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
      <div className="flex">
        {course.owner === u.id && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push(`/app/video/${course.id}`)}
          >
            Create an online session
          </Button>
        )}
        {course.owner !== u.id && status !== "off" && (
          <Button variant="contained" color="secondary" onClick={joinLobby}>
            Join
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/app/course/recordings")}
        >
          Course Recordings
        </Button>
      </div>
    </>
  );
}
