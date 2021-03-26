import axios from "axios";

export const API_URL = "http://localhost:5000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDNhZjUyZWUwZjE3MWQwOGRhZGYzMiIsImlhdCI6MTYxNTA0ODUzMSwiZXhwIjoxNjE3NjQwNTMxfQ.3JRCr4rDTrmihdbo81F4U-JTUqTeVU2FqhT66I5TTe4";
export const Axios = axios.create({
  baseURL: API_URL,
  headers: { Authorization: "Bearer " + token },
});

export const createRoom = async (roomSID, course) => {
  Axios.post("/rooms", {
    roomSID,
    course,
  });
};
export const recordingRoom = async (roomSID) => {
  Axios.post("/rooms/updateStatus/" + roomSID);
};

export const getRoomsByCourseId = async (courseId) => {
  const res = await Axios.get("/rooms/" + courseId);
  return res;
};
export const deleteRoomApi = async (roomSID) => {
  const res = await Axios.delete("/rooms/" + roomSID);
  return res;
};
export const getRoomStatus = async (courseId) => {
  const res = await Axios.get("/twilio/roomStatus/" + courseId);
  return res;
};
export const getMediaLinks = async (roomSID) => {
  const res = await Axios.get("/twilio/getVideo/" + roomSID);
  return res;
};
export const getTwilioToken = async (username, roomName) => {
  const res = await Axios.post("/twilio/token", {
    identity: username,
    room: roomName,
  });
  return res;
};
export const composeVideo = async (roomSID) => {
  const res = await Axios.get("/twilio/composevideo/" + roomSID);
  return res;
};
