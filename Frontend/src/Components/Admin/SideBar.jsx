import { RiLogoutBoxLine } from "react-icons/ri";

import { FaList } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router";
/************************************************************ */
export default function SideBar() {
  return (
    <>
      <div className="sidebar">
        <ul>
          { /************************************************************  */}
          <li>
            <Link to={"/admin"} variant="primary">
              <span className="me-2">
                <MdDateRange />
              </span>
              Add Slot
            </Link>
          </li>
          { /************************************************************  */}
          <li className="mt-5">
            <Link to={"/slotlist"}>
              <span className="me-2">
                <FaList />
              </span>
              Slot List
            </Link>
          </li>
          { /************************************************************  */}
          <li className="mt-5">
            <Link to={"/"}>
              <span className="me-2">
                <RiLogoutBoxLine />
              </span>{" "}
              Exist
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
