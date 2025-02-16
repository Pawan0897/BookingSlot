import { useQuery } from "@tanstack/react-query";

import { SlotTime } from "../../Request/endpoint";
import moment from "moment";
import SideBar from "./SideBar";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddSlots } from "../../Request/endpoint";
import Swal from "sweetalert2";
export default function Admin() {
  const [show, setShow] = useState(false);
  const queryclient = useQueryClient();
  const handleClose = () => setShow(false);

  //  ******************** Formik
  const formik = useFormik({
    initialValues: {
      StartTime: "",
      EndTime: "",
    },
    validationSchema: yup.object({
      StartTime: yup.string().required(),
      EndTime: yup.string().required(),
    }),
    onSubmit: (values) => AddSlot.mutate(values),
  });
  /********************* Add slot Time */
  const AddSlot = useMutation({
    mutationKey: ["slot"],
    mutationFn: (values) => AddSlots(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode) {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "success",
        });
        queryclient.invalidateQueries({ queryKey: ["slottime"] });
        setShow(false), formik.resetForm();
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          icon: "info",
        });
      }
    },
  });
  /********************************** GetSlot time */
  const { data } = useQuery({
    queryKey: ["slottime"],
    queryFn: () => SlotTime(),
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-4 col-xl-4">
            <SideBar />
          </div>
          <div className="col-md-6 col-xl-8 slotbox col-lg-8">
            <div className="slottime bg  p-5">
              <button
                className="bg-danger btn text-light mb-3"
                onClick={() => setShow(true)}
              >
                Add Slot
              </button>
              <table className="table table-bordered bg">
                <thead>
                  <tr className="tr text-light">
                    <th scope="col">Slot Time</th>
                    <th scope="col">Create At</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.data?.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {item?.StartTime} - {item?.EndTime}
                          </td>
                          <td>{moment(item?.CreatedAt).format("lll")}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* ********************** */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mt-3"
            value={formik?.values?.StartTime}
            name="StartTime"
            onChange={formik?.handleChange}
          />
          {formik?.errors?.StartTime && (
            <p className="text-danger">{formik?.errors?.StartTime}</p>
          )}
          {/* ************************************** Modal */}
          <input
            type="text"
            className="form-control mt-3"
            value={formik?.values?.EndTime}
            name="EndTime"
            onChange={formik?.handleChange}
          />
          {formik?.errors?.EndTime && (
            <p className="text-danger">{formik?.errors?.EndTime}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => formik?.handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
