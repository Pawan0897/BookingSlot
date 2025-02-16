import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { SignUpUser } from "../Request/endpoint";
import Swal from "sweetalert2";
export default function Signup() {
  const navigate = useNavigate();
  // *************** fromik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
      name: yup.string().required(),
    }),
    onSubmit: (values) => userRegister.mutate(values),
  });
  /*********** Signup ki api  */
  const userRegister = useMutation({
    mutationKey: ["signupuser"],
    mutationFn: (values) => SignUpUser(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "You are registered successfully !!!",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "Wrong  !!!",
          icon: "error",
        });
      }
    },
  });
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          {/* Main Content */}
          <div className="col-lg-4 col-md-5 m-auto pt-5 mt-5 text-light">
            <div className="wrapper p-5 text-light">
              <span className=" rotate-bg bg-red text-light "></span>
              <div className="form-box  text-center">
                <h2 className="title text-light ">Signup </h2>
                <form>
                  <div className="row">
                    {/*******************  name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">name</label>
                        <input
                          type="text"
                          name="name"
                          value={formik?.values?.name}
                          onChange={formik?.handleChange}
                          className="border-0 form-control"
                        />
                        {formik?.errors?.name && (
                          <p className="text-danger">{formik?.errors?.name}</p>
                        )}
                      </div>
                    </div>
                    {/******************* email name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">email</label>
                        <input
                          type="text"
                          name="email"
                          value={formik?.values?.email}
                          onChange={formik?.handleChange}
                          className="border-0 form-control"
                        />
                        {formik?.errors?.email && (
                          <p className="text-danger">{formik?.errors?.email}</p>
                        )}
                      </div>
                    </div>
                    {/******************* password name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">password</label>
                        <input
                          type="text"
                          name="password"
                          value={formik?.values?.password}
                          onChange={formik?.handleChange}
                          className="border-0 form-control"
                        />
                        {formik?.errors?.password && (
                          <p className="text-danger">
                            {formik?.errors?.password}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* /********************************** */}

                  <button
                    type="button"
                    className=" mt-4 text-center btn btn-log"
                    onClick={() => formik?.handleSubmit()}
                  >
                    {" "}
                    Sign Up
                  </button>

                  {/* ******************** login button */}
                  <div className="linkTxt">
                    <p>
                      Do you have an account?{" "}
                      <a
                        href="#"
                        className="register-link"
                        onClick={() => navigate("/")}
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
