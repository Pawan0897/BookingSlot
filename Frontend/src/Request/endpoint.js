import { https } from "./https";

export const SlotTime = async (body) => {
  return await https.get(`/slot/getslot?StartTime=${body}`);
};

/********************** Booked Apis  */

export const SlotBooked = async (body) => {
  return await https.post("/slot/booked", body);
};

/********************* Booked Lists */
export const BookedList = async () => {
  return await https.get("/slot/list");
};

/**********************  Login Apis */
export const UserLogin = async (body) => {
  return await https.post("/user/login", body);
};

/******************* User SignUP */
export const SignUpUser = async (body) => {
  return await https.post("/user/signup", body);
};

/********************** user */

export const AddSlots = async (body) => {
  return await https.post("/slot/AddSlot", body);
};

/******************* Logout */
export const LogoutUser = async (body) => {
  return await https.post("/user/logout", body);
};
