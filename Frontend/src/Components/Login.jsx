import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { UserLogin } from "../Request/endpoint";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { UserInfo } from "../Redux/Reducer";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /********************** fromik */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => userSignin.mutate(values),
  });
  /*********************** Using login apis */
  const userSignin = useMutation({
    mutationKey: ["login"],
    mutationFn: (values) => UserLogin(values),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "your Are Logged In !!!",
          icon: "success",
        });
        dispatch(UserInfo(res?.data?.data));

        navigate("/booking");
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,

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
                <h2 className="title text-light ">Login </h2>
                <form>
                  <div className="row">
                    {/******************* email name */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">email</label>
                        {/* *************** Email */}
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
                    {/******************* password */}
                    <div className="col-md-12">
                      <div className="input-box mt-2 text-start text-light">
                        <label className="mb-2 text-light">password</label>
                        <input
                          type="password"
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

                  <button
                    type="button"
                    className=" mt-4 text-center btn btn-log"
                    onClick={() => formik?.handleSubmit()}
                  >
                    Click me!
                  </button>

                  {/* ******************** login button */}
                  <div className="linkTxt">
                    <p>
                      Don’t have an account?{" "}
                      <a
                        href="#"
                        className="register-link"
                        onClick={() => navigate("/signup")}
                      >
                        Sing up
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
