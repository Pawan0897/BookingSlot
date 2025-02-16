import { useMutation } from "@tanstack/react-query";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { LogoutUser } from "../Request/endpoint";
import Swal from "sweetalert2";
import { UserInfo } from "../Redux/Reducer";

export default function Logout() {
  const email = useSelector((state) => state.user.userData.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /****************************************** */
  console.log(email.email, ".................lllllllllllllllll");

  const logoutUser = useMutation({
    mutationKey: ["logout"],
    mutationFn: (email) => LogoutUser(email),
    onSuccess: (res) => {
      if (res?.data?.statuscode == 200) {
        dispatch(UserInfo(""));
        Swal.fire({
          title: `${res?.data?.message}`,
          text: "You are logout succesfully now !!!!",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: `${res?.data?.message}`,

          icon: "error",
        });
      }
    },
  });
  /****************************************** */
  return (
    <>
      <Link onClick={() => logoutUser.mutate({ email: email })}>
        <span className="me-2">
          <RiLogoutBoxLine />
        </span>{" "}
        Logout
      </Link>
    </>
  );
}
