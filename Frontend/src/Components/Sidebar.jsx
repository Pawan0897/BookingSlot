import { FaList } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router";
import Logout from "./Logout";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <ul>
          {/* /********************************** */}
          <li>
            <Link to={"/booking"}>
              <span className="me-2">
                <MdDateRange />
              </span>
              Date & time
            </Link>
          </li>
          {/* /********************************** */}
          <li className="mt-5">
            <Link to={"/bookinglist"}>
              <span className="me-2">
                <FaList />
              </span>
              Booking List
            </Link>
          </li>
          {/* /********************************** */}
          <li className="mt-5">
            <Logout />
          </li>
        </ul>
      </div>
    </>
  );
}
