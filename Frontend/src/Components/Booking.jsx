import Sidebar from "./Sidebar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SlotBooked, SlotTime } from "../Request/endpoint";
import { useFormik } from "formik";
import swal from "sweetalert2";
import { useSelector } from "react-redux";
import Search from "./Search";
// *************************************
export default function Booking() {
  const queryclient = useQueryClient();
  const Useremail = useSelector((state) => state.user.email);
  const SearchTime = useSelector((state) => state.user.search);
  /**************** Modal opwn close */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // ****************** Show the message

  const [Showmsg, SetMsg] = useState(false);
  const [showbtn, setbtn] = useState(true);
  const [NewMsgbtn, SetMsgbtn] = useState(true);
  /**************** Get the slots */
  const { data } = useQuery({
    queryKey: ["slots", SearchTime],
    queryFn: () => SlotTime(SearchTime),
  });
  console.log(data?.data?.data, ".......................");

  /*********************** Fromik Yup */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      slotId: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      slotId: yup.string(),
    }),
    onSubmit: (values) => FaBookDead.mutate(values),
  });
  console.log(formik?.values, "////////////");

  /***************** Booked Api */
  const FaBookDead = useMutation({
    mutationKey: ["bookedslot"],
    mutationFn: (body) => SlotBooked(body),
    onSuccess: (res) => {
      setShow(false), formik.resetForm();
      if (res?.data?.statuscode == 200) {
        swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
        queryclient.invalidateQueries({ queryKey: ["slots"] });
        SetMsgbtn(true);
      } else {
        swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
        });
      }
    },
  });
  /********************* notify to already booked !! */
  const notify = () => {
    swal.fire({
      title: "Already Registered !!!",
      text: "This slot is already registered",
      icon: "info",
    });
  };
  // ****************** COlor

  return (
    <>
      <div className="container mt-5 pt-5">
        <Search />
        <div className="row  ">
          <div className="col-xl-3 col-md-5 mb-4 d-flex justify-content-center align-items-center col-sm-12">
            {/* ************ Side bar  */}
            <Sidebar />
          </div>
          {/* ********************* Calender  */}

          {/* ********************* Slot Time */}

          <div className="col-xl-5 col-md-7 slotbox   col-sm-12">
            <div className="slottime bg">
              {/* ***************************** Button time  */}
              {data?.data?.data?.map((item) => {
                return (
                  <>
                    <button
                      className={`${
                        item?.isBooked
                          ? "bg-danger btn text-light me-4 mt-3"
                          : "bg-success btn text-light me-4 mt-3"
                      } `}
                      onClick={() => {
                        if (item?.isBooked == true) {
                          notify();
                        } else {
                          formik?.setValues({ slotId: item?._id });
                          setShow(true);
                        }
                      }}
                    >
                      {item?.StartTime} - {item?.EndTime}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ************************* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ************* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formik?.values?.name}
              onChange={formik?.handleChange}
            />
            {formik?.errors?.name && (
              <p className="text-danger">{formik?.errors?.name}</p>
            )}
          </div>
          {/* ************* Email current */}
          {showbtn && (
            <button
              className="btn me-3  bg-success text-light"
              onClick={() => {
                formik?.setValues({ ...formik?.values, email: Useremail }),
                  SetMsgbtn(false);
              }}
            >
              Contniue With This Mail {Useremail}
            </button>
          )}

          {NewMsgbtn && (
            <Button
              className="btn bg-danger border-0 ms-2 text-light"
              onClick={() => {
                SetMsg(true), setbtn(false), SetMsgbtn(false);
              }}
            >
              New Mail
            </Button>
          )}

          {/* ******************* new mail */}
          {Showmsg ? (
            <div className="mb-3">
              <label className="form-label">Email Adress</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
              />
              {formik?.errors?.email && (
                <p className="text-danger">{formik?.errors?.email}</p>
              )}
            </div>
          ) : (
            ""
          )}

          {/* ******************** end the form of modal */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            type="button"
            onClick={() => formik?.handleSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
