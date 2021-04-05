import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAttendance } from "./url";

export default function Attendance() {
  const { roomId } = useParams();
  const [attendance, setattendance] = useState([]);
  useEffect(() => {
    const func = async () => {
      const { data } = await getAttendance(roomId);
      setattendance(data.data);
    };
    func();
  }, [roomId]);
  return attendance?.map(({ user }) => <h1 key={user._id}>{user.email}</h1>);
}
