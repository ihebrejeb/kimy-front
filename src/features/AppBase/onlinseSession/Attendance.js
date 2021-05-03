import { CircularProgress, List, ListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { getAttendance, getRoomById, getRoomStats } from "./url";
import styles from "./attendance.module.css";
import { Chart } from "react-charts";

function MyChart({ d }) {
  /* const data = React.useMemo(() => {
    if (!users) return [];
    let x = [];
    Object.keys(users).forEach((user) => {
      x.push({
        label: user,
        data: [{ primary: "attendance %", secondary: users[user] }],
      });
    });
    console.log(x);
    return x;
  }, [users]); */
  const data = React.useMemo(() => {
    if (!d) return [];
    return [
      {
        label: "Series 1",
        data: d,
      },
    ];
  }, [d]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  return (
    <div className={styles.chart}>
      <Chart data={data} axes={axes} />
    </div>
  );
}

export default function Attendance() {
  const { roomId } = useParams();
  const [attendance, setattendance] = useState([]);
  const [room, setRoom] = useState();
  const [stat, setStat] = useState();
  useEffect(() => {
    const func = async () => {
      const { data } = await getAttendance(roomId);
      setattendance(data.data);
      const r = await getRoomById(roomId);
      setRoom(r.data);
    };
    func();
  }, [roomId]);
  useEffect(() => {
    function dataPrep() {
      let { stats } = room;

      let data = [[0, 0]];
      console.log(stats.frames);
      stats.frames.forEach((frame) => {
        data.push([frame.frame * 10, frame.users.length]);
      });
      /*  let att = { total: totalFrames * 10 + " seconds" };
      Object.keys(users).forEach((user) => {
        att[user] = users[user] * 10 + " seconds";
      }); */
      data.sort((a, b) => a[0] - b[0]);

      setStat(data);
    }
    if (room) dataPrep();
  }, [room]);
  async function getStats() {
    let data = await getRoomStats(room.roomSID);
    console.log(data);
  }
  function RenderAttendance() {
    return attendance?.map(({ user }) => (
      <ListItem key={user._id}>{user.email}</ListItem>
    ));
  }

  return (
    <>
      {!room?.stats.totalFrames &&
        (room?.processing ? (
          <Button className={styles.buttonProgress}>
            getting stats
            <CircularProgress size={16}></CircularProgress>
          </Button>
        ) : (
          <Button onClick={getStats}>getStats</Button>
        ))}

      {room?.stats.totalFrames ? (
        <>
          <h3 className={styles.center}>Numbre of faces each 10 seconds </h3>
          <MyChart d={stat}></MyChart>
        </>
      ) : undefined}

      <List
        component="ul"
        aria-label="secondary mailbox folders"
        className={styles.list}
      >
        <ListItem>Attendance List:</ListItem>
        <RenderAttendance></RenderAttendance>
      </List>
    </>
  );
}
