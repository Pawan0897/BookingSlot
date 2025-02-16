import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Booking from "./Booking";
import BookingList from "./BookingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/style.css";
import Admin from "./Admin/Admin";
import SlotList from "./Admin/SlotList";
export default function Layouts() {
  // if you want to add the Slot using the /admin route and add the slot for booking users
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* ***************************   Singup User  */}
          <Route path="/signup" element={<Signup />} />
          {/* *****************************  boking */}
          <Route path="/booking" element={<Booking />} />
          {/* ******************************* slot list */}
          <Route path="/bookinglist" element={<BookingList />} />
          {/* **************************** Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/slotlist" element={<SlotList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
