import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import { BookedList } from "../Request/endpoint";
import moment from "moment";
export default function BookingList() {
  /********************************** */
  const { data } = useQuery({
    queryKey: ["bookinglist"],
    queryFn: () => BookedList(),
  });
  console.log(data, ".............");

  return (
    <>
      {/* /********************************** */}
      <div className="container mt-5 pt-5">
        <div className="row ">
          {/* /********************************** */}
          <div className="col-md-6 col-lg-3 col-xl-3 col-sm-12">
            <Sidebar />
          </div>
          {/* /********************************** */}
          <div className="col-md-6 col-lg-9 col-xl-9 col-sm-12">
            <div className="slottime bg  p-5">
              <table className="table table-bordered bg">
                <thead>
                  <tr className="tr text-light">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Slot Time</th>
                    <th scope="col">Create At</th>
                  </tr>
                </thead>
                {/* /********************************** */}
                <tbody>
                  {data?.data?.data?.map((item) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{item?.name}</th>
                          <td>{item?.email}</td>
                          <td>
                            {item?.BookedList?.StartTime} -{" "}
                            {item?.BookedList?.EndTime}
                          </td>
                          <td>{moment(item?.createdAt).format("llll")}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                {/* /********************************** */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
